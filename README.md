# MMM-ParallelPing

Parallel Ping Module for MagicMirror<sup>2</sup>. This module is a fork of [MMM-ping](https://github.com/fewieden/MMM-voice) but running ping request in a concurrent way.

## Dependencies

* [ping](https://www.npmjs.com/package/ping)

## Installation

* Clone this repo into `~/MagicMirror/modules` directory.
* Configure your `~/MagicMirror/config/config.js`:

```js
{
    module: 'MMM-ParallelPing',
    position: 'bottom_right',
    config: {
        hosts: [
            // use host/IP only
            'www.github.com',
            // or specify a custom label for host/IP
            {
                label: 'MagicMirror Forums',
                host: 'forum.magicmirror.builders'
            }
        ]
    }
}
```

* Run command `npm install --production` in `~/MagicMirror/modules/MMM-ParallelPing` directory.

## Config Options

| **Option**       | **Default** | **Description**                                                                |
|------------------|-------------|--------------------------------------------------------------------------------|
| `colored`        | `false`     | show badge in color or not                                                     |
| `display`        | `'both'`    | what should be displayed `'online'`, `'offline'` or `'both'`                   |
| `hosts`          | `[]`        | addresses to ping                                                              |
| `updateInterval` | `300`       | how often the module should ping the hosts in seconds                          |
| `font`           | `'medium'`  | font size `'xsmall'`, `'small'`, `'medium'`, `'large'` or `'xlarge'`           |
| `transitionTime` | `300`       | Time (in milliseconds) the transition for a new update in the DOM should take. |

## OPTIONAL: Voice Control and Modal

This module supports voice control by [MMM-voice](https://github.com/angeldeejay/MMM-voice) and [MMM-Modal](https://github.com/angeldeejay/MMM-Modal).
In order to use this feature, it's required to install the voice and modal modules. There are no extra config options for voice control and modals needed.

### Mode

The voice control mode for this module is `PING`

### List of all Voice Commands

* OPEN HELP -> Shows the information from the readme here with mode and all commands.
* CLOSE HELP -> Hides the help information.
* SHOW ALL HOSTS -> Shows a list of all hosts with online state online and offline.
* HIDE HOSTS -> Hide the list.

## Developer

* `npm run lint` - Lints JS and CSS files.
* `npm run docs` - Generates documentation.
