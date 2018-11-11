# Dashed Button

## Installation

### From npm
Install the package
```bash
npm install @dashedjs/button
```

and then import it in your javascript as follow
```javascript
import { DashedButton } from '@dashedjs/dashed-button';
```

### Or with as script tag
```html
Add this script to your HTML
<script src="https://dashedjs.com/packages/button/dist/button.min.js"></script>
```

## Usage



```HTML
<dashed-button>Default</dashed-button>
```

```HTML
<dashed-button rounded="true">Rounded</dashed-button>
```

```HTML
<dashed-button disabled="true">Disabled</dashed-button>
```

```HTML
<dashed-button dash-with="2" dash-length="10" dash-spacing="0.2" dash-color="warn">Custom Dash</dashed-button>
```

```HTML
<dashed-button dash-with="2" dash-length="10" dash-spacing="0.2" dash-color="warn">Fill color</dashed-button>
```

## API

### Properties & Attributes
Each attribute has a correspondant property in camelCase (ex. **dash-width** => **dashWidth**) which you can set via Javascript

Here is all the avaiable attributes:
| Property      | Default value | Possible values                                                                                |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| disabled      | **false**     | true / false                                                                                   |
| rounded       | **false**     | true / false                                                                                   |
| border-radius | **0**         | numeric                                                                                        |
| dash-with     | **2**         | numeric                                                                                        |
| dash-length   | **8**         | numeric                                                                                        |
| dash-spacing  | **2.4**       | numeric                                                                                        |
| dash-color    | **default**   | default / primary / secondary / success/ danger / warn OR any color (HEX, RGBA, or color name) |


### Theme
Say you want to change the color of the dash for instance. You can either set the **dash-color** property to the desired color value.
An other approach is to define your custom theme by overrinding CSS custom variables. The exposed CSS variables are listed below.


#### Custom properties specific to the DashedButton
| CSS custom property | Default value            |
| ------------------- | ------------------------ |
| --color             | **var(--color-primary)** |
| --padding           | **4px 12px**             |

#### Custom properties shared by all components
| CSS custom property     | Default value                  |
| ----------------------- | ------------------------------ |
|                         |
| **Colors**              |
| --color-primary         | **#3636e7**                    |
| --color-primary-light   | **#3636e726**                  |
| --color-secondary       | **#ce8207**                    |
| --color-secondary-light | **#e39248bf**                  |
| --color-accent          | **#cc6c7a**                    |
| --color-accent-light    | **#ef8e9d99**                  |
| --color-success         | **#1f8d57**                    |
| --color-success-light   | **#1f8d5726**                  |
| --color-danger          | **#fa3232**                    |
| --color-danger-light    | **#fa323226**                  |
| --color-warn            | **#cd9a1a**                    |
| --color-warn-light      | **#cbab59ad**                  |
| --color-outline         | **#8181c1**                    |
| --color-fill            | **var(--color-primary-light)** |
|                         |
| **Fonts**               |
| --font-small            | **0.8rem**                     |
| --font-medium           | **1rem**                       |
| --font-large            | **1.5rem**                     |
| --font-xlarge           | **2rem**                       |

#### Custom properties specific for the dashed-button
### Event listeners

- click 