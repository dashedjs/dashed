# Dashed Button

## Install

`npm install @dashedjs/button`
or
`<script type="module" src="https://...."></script>`

## Usage

```
<dashed-button></dashed-button>
<dashed-button rounded="true"></dashed-button>
<dashed-button disabled></dashed-button>
<dashed-button fillColor="lightcyan"></dashed-button>

<dashed-button dashWith="2" dashLength="10" dashRatio="0.2"></dashed-button>
```

## Api

### Host properties
| Property  | Default value |
| --------- | ------------- |
| disabled  | **-**         |
| rounded   | **-**         |
| fillColor | **none**      |

### Dash properties
| Property   | Default value |
| ---------- | ------------- |
| dashWidth  | **2**         |
| dashLength | **8**         |
| dashRatio  | **0.3**       |

### CSS customization
| Variable               | Default value |
| ---------------------- | ------------- |
| --dashed-primary-color | **#0000ff**   |
| --dashed-fill-color    | **lightcyan** |

### Event listeners

- click 