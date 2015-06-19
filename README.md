
# Spork

Spork is a tool used to transform HTML documents, primarily specifications. It is more precisely
used to publish W3C HTML (but can be used more generically).

The architecture is simple. The `spork` tool will run a given **profile**, which in turn will list
some **rules** to apply. The pipeline that this defines, together with a few configuration options,
is what will transform the document.

## Installation

The simplest way in which to install this is to clone the repository, then run `npm install -d` at
its root.

## `spork`

This gets installed with `npm install` (or `npm link` from the repo, which is likely better). It
takes the name of a profile (currently `html` or `html-wd`) and the path to the configuration file
(e.g. `spork html ./config.json`).

This can also be used as a library, exposing a `run()` method. It is the primary entry point that
will manage the profile, handle some common tasks, and use that to process the document.

## `cherry-picker.js`

The cherry picker (so called because it is intended to replace the humans who did this job) is a
script that wraps `spork` and is meant to run as a cron job in order to carry out the publication.
It accepts the following arguments:

* `--config path`, `-c path`. The required path to a JSON configuration file (described below).
* `--force`, `-f`. By default if there are no changes to the HTML source the tool does nothing; this
  forces a regeneration.
* `--quiet`, `-q`. By default the script logs a lot of information to the console. This switches
  that off (it will keep logging to any specified log file and sending errors to a given email
  address if specified).
* `--publish`, `-p`. By default the script produces an Editor's Draft; this switches it to produce
  a Working Draft. This also make it call the automatic publishing system to request publication of
  the draft.

### Configuration

Spork and the cherry picker needs a configuration file with the following:

* `outDir`. Required when not in `publish` mode. The path to the directory to which to save the
  generated spec.
* `pubDir`. Required in `publish` mode, replaces `outDir`.
* `logFile`. The file to which to log when not in `publish` mode. Optional, if absent no file
  logging takes place.
* `pubLogFile`. Same as `logFile` but for `publish` mode.
* `production`. When set to true (on the production installation and **never** on the development
  copy) this causes the picker to check *itself* for updates, and to `git pull` if needed. When this
  happens, on the next invocation of the cron job the HTML will also get regenerated.
* `token`. The Echidna token. If absent, automatic publication will fail.
* `echidnaURL`. The URL to give to Echidna for publication. For HTML this is a manifest file.
* `decisionURL`. The link to a decision by the group to publish.
* `email`. If you wish to be notified of problems over email (highly recommended) you will need to
  detail this object. You will receive all failures that cause the spec not to be built, notably
  changes to the source that make it impossible for the system to apply a given transformation.
    * `to`. Who to send it to.
    * `from`. Who it's from.
    * `host`. The SMTP service.
    * `port`. The SMTP port.
    * `username`. The username for the SMTP service.
    * `password`. And password.
    * `ssl`. Whether to access SMTP over SSL.
    * `tls`. Same for TLS.
    * `level`. The level to send over email. It is recommended to use `error`. Switching to `info` will
      get you an email for every run of the tool.
    * `handleExceptions`. Set to true to get exceptions (that kill the process) sent to you in email.
      Recommended.

For spork, you only really need `outDir`, `pubDir`, `logFile`, `publogFile`, and `production`.

## Profiles

There are currently two profiles, `html` and `html-wd`. Both are under `./profiles/`.

Profiles export a specific interface.

* `name`. The name of the profile. Used in reporting.
* `url`. The source from which to fetch the document.
* `configuration`. An object with content that can be used to control the behaviour of some rules or
  downstream processes.
    * `configuration.downloads`. This field of `configuration` is worth bringing forward. It is a
      mapping of URLs to paths (relative to the output directory). Those URLs will be downloaded to
      those paths.
* `resources(res)`. If this method is defined, it will get called for every resource that the source
  page attempts to download. This can be used to inform later processing (rewriting links,
  downloading dependencies through `configuration.downloads`).
* `setup(cb)`. If present, this method is called at the beginning so a profile can make some
  preparations. Once it's done, it needs to call `cb`.
* `rules`. This is an array of rules objects that will be processed in that order.
* `finalise(config, specFiles, otherFiles, cb)`. Once processing is finished (successfully) if this
  exists it is called with the configuration that was used, the specification files (there can be
  several in case splitting happened), the other files (typically images and such), and a `cb` to
  call when processing it done. All files are given relative to the output directory. A typical
  usage is to generate the manifest for Echidna.

## Rules

Rules are specific objects that implement a basic transformation to a spec. They have the following
interface.

* `name`. The required name of the rule, used for logging and the such.
* `landscape`. A string of HTML that needs to describe the transformation when it causes a change
  that should be documented as a difference from WHATWG HTML.
* `transform()`. The method that does the transformation. Be careful: this is run in a PhantomJS
  context, it **cannot** use anything defined in its context. What happens is that it gets
  stringified and given params (based on another method described below), then evaluated in the
  PhantomJS context.
* `params(configuration)`. This method, if defined, is called before `transform()` is serialised. It
  is expected to return an **array** of JavaScript objects that can be serialised to JSON. Each one
  of these objects will get passed as an argument to `transform()`. This is typically used to load
  templates and content.
* `copy`. This is an object. If defined its keys are paths to files (from the root of the `spork`
  repository) and values are where to copy those files to in the output directory.

