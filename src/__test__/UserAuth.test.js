import supertest from "supertest";

import app from "../app";

const request = supertest(app);

// Register api '/api/v1/auth/register'

describe("Register User api '/api/v1/auth/user/register'", () => {
  // Test case DK05: Để trống field Email
  // expect: status code 422, message: 'Email là bắt buộc'
  it("DK05: Để trống field Email", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "",
      password: "Abcd1234!",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Email là bắt buộc");
  });
  // Test case DK06: Nhập Email = 51 ký tự
  // expect: status code 422, message: 'Email phải có tối đa 50 ký tự'
  it("DK06: Nhập Email = 51 ký tự", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abcabsdljkflsdjkfsldkjflsddfjhdfkgkfdgkjf@gmail.com",
      password: "Abcd1234!",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Email phải có tối đa 50 ký tự");
  });
  // Test case DK07: Nhập Email hợp lệ chưa tồn tại trong db với độ dài <= 50 ký tự
  // expect: status code 200, message: 'Vui lòng kiểm tra email để hoàn tất đăng ký'
  //   do thành công nên nó phải gửi mail, nên test này bị timeout
  //   it("DK07: Nhập Email hợp lệ chưa tồn tại trong db với độ dài <= 50 ký tự", async () => {
  //     const response = await request.post("/api/v1/auth/user/register").send({
  //       email: "abc@gmail.com",
  //       password: "Abcd1234!",
  //       name: "RodolfoLang5",
  //     });
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe("Vui lòng kiểm tra email để hoàn tất đăng ký");
  //   });
  // Test case DK08: Nhập Email thiếu tên miền
  // expect: status code 422, message: 'Email không đúng định dạng'
  it("DK08: Nhập Email thiếu tên miền", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abc@gmail",
      password: "Abcd1234!",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Email không đúng định dạng");
  });
  // Test case DK09: Nhập Email thiếu @
  // expect: status code 422, message: 'Email không đúng định dạng'
  it("DK09: Nhập Email thiếu @", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abcgmail.com",
      password: "Abcd1234!",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Email không đúng định dạng");
  });
  // Test case DK10: Nhập Email thiếu tên miền sau dấu chấm
  // expect: status code 422, message: 'Email không đúng định dạng'
  it("DK10: Nhập Email thiếu tên miền sau dấu chấm", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abc@gmail.",
      password: "Abcd1234!",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Email không đúng định dạng");
  });
  // Test case DK11: Nhập Email chứa ký tự đặc biệt (trừ @ và .)
  // expect: status code 422, message: 'Email không đúng định dạng'
  it("DK11: Nhập Email chứa ký tự đặc biệt (trừ @ và .)", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "a!#$bc@gmail.com",
      password: "Abcd1234!",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Email không đúng định dạng");
  });
  // Test case DK13: Nhập Email đã tồn tại trong db
  // expect: status code 400, message: 'Email đã tồn tại'
  it("DK13: Nhập Email đã tồn tại trong db", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "Quinn.Goodwin22@gmail.com",
      password: "Abcd1234!",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email đã tồn tại");
  });
  // Test case DK15: Để trống field name
  // expect: status code 422, message: 'Name là bắt buộc'
  it("DK15: Để trống field name", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abc@gmail.com",
      password: "Abcd1234!",
      name: "",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Name là bắt buộc");
  });
  // Test case DK16: Nhập name = chuỗi ký tự
  // expect: status code 200, message: 'Vui lòng kiểm tra email để hoàn tất đăng ký'
  //   it("DK16: Nhập name = chuỗi ký tự", async () => {
  //     const response = await request.post("/api/v1/auth/user/register").send({
  //       email: "abc@gmai.com",
  //       password: "Abcd1234!",
  //       name: "RodolfoLang5",
  //     });
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe("Vui lòng kiểm tra email để hoàn tất đăng ký");
  //   });
  // Test case DK17: Nhập name = độ dài tối thiểu (3)
  // expect: status code 200, message: 'Vui lòng kiểm tra email để hoàn tất đăng ký'
  //   it("DK17: Nhập name = độ dài tối thiểu (3)", async () => {
  //     const response = await request.post("/api/v1/auth/user/register").send({
  //       email: "abc@gmai.com",
  //       password: "Abcd1234!",
  //       name: "Rod",
  //     });
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe("Vui lòng kiểm tra email để hoàn tất đăng ký");
  //   });
  // Test case DK18: Nhập name >  50 ký tự (nhập 51 ký tự)
  // expect: status code 422, message: 'Name phải có tối đa 50 ký tự'
  it("DK18: Nhập name >  50 ký tự (nhập 51 ký tự)", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abdfc@gmail.com",
      password: "Abcd1234!",
      name: "abcahksjdhgkjsdgkkdsjghjkdsgsdhgkjsdhjdksfsd1234567",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Name phải có tối đa 50 ký tự");
  });
  // Test case DK18: Nhập name = 50 ký tự
  // expect: status code 200, message: 'Vui lòng kiểm tra email để hoàn tất đăng ký'
  //   it("DK18: Nhập name = 50 ký tự", async () => {
  //     const response = await request.post("/api/v1/auth/user/register").send({
  //       email: "abdfc@gmail.com",
  //       password: "Abcd1234!",
  //       name: "abcahksjdhgkjsdgkkdsjghjkdsgsdhgkjsdhjdksfsd123456",
  //     });
  //     expect(response.status).toBe(422);
  //     expect(response.body.message).toBe("Name phải có tối đa 50 ký tự");
  //   });
  // Test case DK22: Bỏ trống field Password
  // expect: status code 422, message: 'Password là bắt buộc'
  it("DK22: Bỏ trống field Password", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abdfc@gmail.com",
      password: "",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Password là bắt buộc");
  });
  // Test case Dk24: Nhập Password có 7 ký tự
  // expect: status code 422, message: 'Password phải có ít nhất 8 ký tự'
  it("DK24: Nhập Password có 7 ký tự", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abdfc@gmail.com",
      password: "Abcd123",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Password phải có ít nhất 8 ký tự");
  });
  // Test case DK25: Nhập Password hợp lệ có 8 ký tự
  // expect: status code 200, message: 'Vui lòng kiểm tra email để hoàn tất đăng ký'
  // it("DK25: Nhập Password hợp lệ có 8 ký tự", async () => {
  //   const response = await request.post("/api/v1/auth/user/register").send({
  //  email: "abdfc@gmail.com",
  //     password: "Abcd1234@",
  //     name: "RodolfoLang5",
  //   });
  //   expect(response.status).toBe(200);
  //   expect(response.body.message).toBe("Vui lòng kiểm tra email để hoàn tất đăng ký");
  // });
  // Test case DK26: Nhập Password hợp lệ có 20 ký tự
  // expect: status code 200, message: 'Vui lòng kiểm tra email để hoàn tất đăng ký'
  // it("DK26: Nhập Password hợp lệ có 20 ký tự", async () => {
  //   const response = await request.post("/api/v1/auth/user/register").send({
  //  email: "abdfc@gmail.com",
  //     password: "Abcd1234@Abcd1234@Abcd1234@",
  //     name: "RodolfoLang5",
  //   });
  //   expect(response.status).toBe(200);
  //   expect(response.body.message).toBe("Vui lòng kiểm tra email để hoàn tất đăng ký");
  // });
  // Test case DK27: Nhập Password hợp lệ có 21 ký tự
  // expect: status code 422, message: 'Password không được vượt quá 20 ký tự'
  it("DK27: Nhập Password hợp lệ có 21 ký tự", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abdfc@gmail.com",
      password: "Abcd1234@Abcd1234@Abcd1234@A",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Password không được vượt quá 20 ký tự");
  });
  // Test case DK28: Nhập Password hợp lệ có cả chữ, số, ký tự đặc biệt
  // expect: status code 200, message: 'Vui lòng kiểm tra email để hoàn tất đăng ký'
  //   it("DK28: Nhập Password có độ dài hợp lệ [8,20] có cả chữ, số, ký tự đặc biệt", async () => {
  //     const response = await request.post("/api/v1/auth/user/register").send({
  //       email: "abdfc@gmail.com",
  //       password: "Abcd1234@",
  //       name: "RodolfoLang5",
  //     });
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe("Vui lòng kiểm tra email để hoàn tất đăng ký");
  //   });
  // Test case DK29: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ hoa
  // expect: status code 422, message: 'Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)'
  it("DK29: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ hoa", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abdfc@gmail.com",
      password: "ABCDEF123@",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe(
      "Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)"
    );
  });
  // Test case DK30: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ thường
  // expect: status code 422, message: 'Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)'
  it("DK30: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ thường", async () => {
    const response = await request.post("/api/v1/auth/user/register").send({
      email: "abdfc@gmail.com",
      password: "abcdef123@",
      name: "RodolfoLang5",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe(
      "Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)"
    );
  });
});
