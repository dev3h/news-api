1. Mặc định khi chạy lệnh trong src `sequelize init` sẽ tạo ra 4 thư mục là `config`, `migrations`, `models`, `seeders`
2. Nếu khi thay đổi đường dẫn của các folder này thì khi tạo 1 model thì sẽ báo lỗi
3. Để khắc phục thì ta sẽ tạo 1 file `.sequelizerc` trong thư mục gốc của project
4. Sau đó ta sẽ chạy lệnh

```bash
node_modules/.bin/sequelize init --force
```

5. Khi tạo model với sequelize-cli thì phải đứng ở root để chạy lệnh nếu có config `.sequelizerc`
