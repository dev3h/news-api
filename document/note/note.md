- Để hiển thị câu query ta có thể sử dụng ` logging: console.log,`

```js
const response = await db.Department.findAndCountAll({
  where: query,
  ...queries,
  logging: console.log,
});
```
