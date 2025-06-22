# 🧩 Tooltipix.js

Tired of clunky, rigid tooltips that barely behave?  
**Tooltipix.js** gives you the precision of a laser pointer with the elegance of a feather — responsive, animated, and fully customizable. 🎯✨

---

## ✨ Why Tooltipix.js

- 📍 **Custom positions** — choose from `top`, `bottom`, `left`, `right`
- 🧭 **Follow cursor** — tooltips that chase your mouse like a loyal companion
- ⏱️ **Configurable delay & duration** — because timing matters
- 🖱️ **Trigger options** — `hover`, `click`, `focus` or all at once
- 🎞️ **Keyframe animations** — smooth as butter transitions
- 🔻 **Custom arrows** — automatically positioned to match direction
- ⚙️ **Fully customizable via `data-*` attributes**
- 💡 **Auto-init and zero dependencies** — plug and play simplicity
- 🚀 **Lightweight** — < 5KB minified, no bloat

---

## 👀 See Demo

Check out the live demo of Tooltipix.js in action:  
[Tooltipix.js Demo](https://plenixnetwork.github.io/tooltipix.js/)

---

## 📦 Installation

### Global Script (via jsDelivr)
```html
<script src="https://cdn.jsdelivr.net/gh/PlenixNetwork/tooltipix.js/dist/main.js"></script>
<script>
  tooltipix.init(); // Activates tooltips on the page
</script>
```

### CommonJS
```bash
const tooltipix = require('tooltipixjs');
tooltipix.init();
```

### ESModules
```bash
import tooltipix from 'tooltipixjs';
tooltipix.init();
```

## 🚀 Basic Usage
Just add `data-tooltip` to any element:
```html
<button data-tooltip="I’m a tooltip!">Hover me</button>
```
Or customize position and delay:
```html
<span 
  data-tooltip="Tooltip below with a delay" 
  data-position="bottom"
  data-delay="300"
>
  Hover me
</span>
```

## ⚙️ Available Attributes
| Attribute       | Description                                                       | Example             |
| --------------- | ----------------------------------------------------------------- | ------------------- |
| `data-tooltip`  | Tooltip content                                                   | `"I'm a tooltip!"`  |
| `data-position` | Tooltip direction: `top`, `bottom`, `left`, `right`               | `"top"`             |
| `data-delay`    | Delay before showing the tooltip (ms)                             | `"200"`             |
| `data-duration` | Time before auto-hiding the tooltip (ms)                          | `"3000"`            |
| `data-follow`   | Makes tooltip follow the mouse cursor                             | *(no value needed)* |
| `data-trigger`  | One or more triggers: `click`, `hover`, `focus` (comma-separated) | `"click,focus"`     |

## ✨ Styling & Animations
Tooltipix comes with minimal styling. Want more flair? Customize the styles like this:
```css
.tooltipix {
  background: #222;
  color: #fff;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## 🛠️ Control Methods
```javascript
tooltipix.init();     // Attach global listeners
tooltipix.destroy();  // Clean up tooltips and styles
```

## 📄 License
This project is licensed under the MIT License.
