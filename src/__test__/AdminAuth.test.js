import supertest from "supertest";

import app from "../app";

const request = supertest(app);

// Login admin api '/api/v1/auth/admin/login'

describe("Login admin api '/api/v1/auth/admin/login'", () => {
  // Test case DN05: Để trống field hoặc nhập “UserName” = chuỗi space
  // expect: status code 422, message: 'UserName là bắt buộc'
  it("DN05: Để trống field UserName", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "",
      password: "Abcd1234!",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Username là bắt buộc");
  });

  it("DN05: nhập UserName = chuỗi space", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "         ",
      password: "Abcd1234!",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Username là bắt buộc");
  });

  // Test case DN06': Nhập UserName không tồn tại trong hệ thống
  // expect: status code 400, message: 'UserName không tồn tại'
  it("DN06': Nhập UserName không tồn tại trong hệ thống", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "admin123",
      password: "Abcd1234!",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Username không tồn tại");
  });
  // Test case DN06: Nhập UserName tồn tại trong hệ thống
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN06: Nhập UserName tồn tại trong hệ thống", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "HortenseWatsica27",
      password: "Abcd1234@",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Đăng nhập thành công");
  });
  // Test case DN07: Nhập UserName tồn tại trong hệ thống với 3 ký tự
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN07: Nhập UserName tồn tại trong hệ thống với 3 ký tự", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "Bet",
      password: "Abcd1234@",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Đăng nhập thành công");
  });
  // Test case DN08: Nhập UserName > 50 ký tự
  // expect: status code 422, message: 'Username không được vượt quá 50 ký tự'
  it("DN08: Nhập UserName > 50 ký tự", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz",
      password: "Abcd1234@",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Username không được vượt quá 50 ký tự");
  });
  // Test case DN09: Nhập UserName tồn tại trong hệ thống với 50 ký tự
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN09: Nhập UserName tồn tại trong hệ thống với 50 ký tự", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "DiamondCarter49AdditionalText123456789012345678901",
      password: "Abcd1234@",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Đăng nhập thành công");
  });
  // Test case DN10: Nhập UserName có ký tự đặc biệt
  // expect: status code 422, message: 'Username không được chứa ký tự đặc biệt'
  it("DN10: Nhập UserName có ký tự đặc biệt", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "Abc@",
      password: "Abcd1234@",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Username không được chứa ký tự đặc biệt");
  });
  // Test case DN12: Bỏ trống field Password
  // expect: status code 422, message: 'Password là bắt buộc'
  it("DN12: Bỏ trống field Password", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "RodolfoLang5",
      password: "",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Password là bắt buộc");
  });
  // Test case DN14: Nhập Password có 7 ký tự
  // expect: status code 422, message: 'Password phải có ít nhất 8 ký tự'
  it("DN14: Nhập Password có 7 ký tự", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "RodolfoLang5",
      password: "Abcd123",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Password phải có ít nhất 8 ký tự");
  });
  // Test case DN15: Nhập Password hợp lệ có 8 ký tự
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN15: Nhập Password hợp lệ có 8 ký tự", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "Mossie44",
      password: "Abcd123@",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Đăng nhập thành công");
  });
  // Test case DN16: Nhập Password hợp lệ có 20 ký tự
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN16: Nhập Password hợp lệ có 20 ký tự", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "Geovanni88",
      password: "Acbdefghiklmnop1234@",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Đăng nhập thành công");
  });
  // Test case DN17: Nhập Password hợp lệ có 21 ký tự
  // expect: status code 422, message: 'Password không được vượt quá 20 ký tự'
  it("DN17: Nhập Password hợp lệ có 21 ký tự", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "RodolfoLang5",
      password: "Abcd1234@Abcd1234@Abcd1234@A",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Password không được vượt quá 20 ký tự");
  });
  // Test case DN18: Nhập Password hợp lệ có cả chữ, số, ký tự đặc biệt
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN18: Nhập Password có độ dài hợp lệ [8,20] có cả chữ, số, ký tự đặc biệt", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "HortenseWatsica27",
      password: "Abcd1234@",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Đăng nhập thành công");
  });
  // Test case DN19: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ hoa
  // expect: status code 422, message: 'Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)'
  it("DN19: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ hoa", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "RodolfoLang5",
      password: "ABCDEF123@",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe(
      "Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)"
    );
  });
  // Test case DN20: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ thường
  // expect: status code 422, message: 'Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)'
  it("DN20: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ thường", async () => {
    const response = await request.post("/api/v1/auth/admin/login").send({
      username: "RodolfoLang5",
      password: "abcdef123@",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe(
      "Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)"
    );
  });
});
