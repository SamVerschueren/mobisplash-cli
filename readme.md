# mobisplash-cli [![Build Status](https://travis-ci.org/SamVerschueren/mobisplash-cli.svg?branch=master)](https://travis-ci.org/SamVerschueren/mobisplash-cli)

> Mobile app splash screen generator


## Install

```
$ npm install --global mobisplash-cli
```


## Usage

```
$ mobisplash --help

  Usage
    $ mobisplash <file>

  Options
    -p, --platform      Platform to generate icons for
    -b, --background    Color of the icon background if the icon is transparant [Default: white]
    -r, --contentRatio  Logo-icon ratio [Default: 0.8]
    -o, --out           Output directory [Default: cwd]
    --orientation       Orientation to generate the splash screens for [Default: both]
    --9patch            9-patch the Android splash screens [Default: true]

  Examples
    $ mobisplash icon.png -p=android
      ✔  success
    $ mobisplash icon.png -p=android --no-9patch
      ✔  success
    $ mobisplash icon.png -p=android -p=ios --orientation=landscape
      ✔  success
    $ mobisplash icon.svg -p=ios -o=resources
      ✔  success
    $ mobisplash icon.svg -p=blackberry10 -o=resources --orientation=portrait
      ✔  success
```


## Platforms

A list of the available platforms and their generated icons can be found [here](https://github.com/SamVerschueren/mobisplash#platforms).


## Related

- [mobisplash](https://github.com/SamVerschueren/mobisplash) - API for this module


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
