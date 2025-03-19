
# Talks

A realtime communication webapp inspire by Whatsapp.


## API Reference

#### Get all items

```http
  GET /api/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



## Appendix

Any additional information goes here


## Authors

- [@snippetarnab](https://github.com/snippetarnab)


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Tech Stack

**Client:** React, Redux, TailwindCSS, Daisy Ui, Lucide, zustand

**Server:** Node, Express, Socketio, MongoDB, Cloudinary, bcryptjs, jsonwebtoken


## Features

- Light/dark mode
- Live previews
- Real time communication
- Cross platform




