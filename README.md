# Now

[![Netlify Status](https://api.netlify.com/api/v1/badges/e5f8538d-0140-4761-9b2d-c0fe53c67ed5/deploy-status)](https://app.netlify.com/sites/damonzucconi-now/deploys)

## Meta

- **State**: production
- **Production**:
  - **URL**: https://now.work.damonzucconi.com/
  - **URL**: https://damonzucconi-now.netlify.app/
- **Host**: https://app.netlify.com/sites/damonzucconi-now/overview
- **Deploys**: Merged PRs to `dzucconi/now#master` are automatically deployed to production. [Manually trigger a deploy](https://app.netlify.com/sites/damonzucconi-now/deploys)

## Parameters

| Param             | Description                          | Type                        | Default    |
| ----------------- | ------------------------------------ | --------------------------- | ---------- |
| `interval`        | Time between frames                  | `number`                    | `50`       |
| `amount`          | Density of instances on ring         | `number`                    | `20`       |
| `fadeDuration`    | Fade duration                        | `number`                    | `1000`     |
| `padding`         | Padding                              | `number`                    | `15`       |
| `fontSize`        | Font size                            | `number`                    | `5`        |
| `backgroundColor` | Background color                     | `string`                    | `"black"`  |
| `color`           | Foreground color                     | `string`                    | `"yellow"` |
| `mode`            | Mode                                 | `"count" / "text" / "time"` | `"count"`  |
| `text`            | Text when in "text" mode             | `string`                    | `"now"`    |
| `window`          | Number of letters permitted per line | `number`                    | `15`       |
