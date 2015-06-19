
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

### Configuration

`spork` needs a configuration file with the following:

* `outDir`. Required when not in `publish` mode. The path to the directory to which to save the
  generated spec.
* `pubDir`. Required in `publish` mode, replaces `outDir`.
* `logFile`. The file to which to log when not in `publish` mode. Optional, if absent no file
  logging takes place.
* `pubLogFile`. Same as `logFile` but for `publish` mode.
* `production`. Set to false for the development copy

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

