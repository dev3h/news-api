1 Để hiển thị câu query ta có thể sử dụng ` logging: console.log,`

```js
const response = await db.Department.findAndCountAll({
  where: query,
  ...queries,
  logging: console.log,
});
```

2 Express xử lý các route theo thứ tự xuất hiện trong file router. Khi Express gặp một route khớp với yêu cầu, nó sẽ không xem xét các route khác nằm sau nó
Để kiểu này khi gọi route export-excel thì nó sẽ không vào route index nữa

```js
router.get("/export-excel", (req, res) => res.send("export excel"));
router.get("/", ProductController.index);
```

- Còn nếu để route export ở cuối cùng thì nó sẽ ko chạy được route export
