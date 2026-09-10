class RoleSysEnum {
  static ADMIN = 0;
  static AUTHOR = 1;

  static getRoleSysName(roleSys) {
    switch (roleSys) {
      case RoleSysEnum.ADMIN:
        return "ADMIN";
      case RoleSysEnum.AUTHOR:
        return "AUTHOR";
      default:
        return null;
    }
  }

  static getAll() {
    return [
      { id: RoleSysEnum.ADMIN, name: "ADMIN" },
      { id: RoleSysEnum.AUTHOR, name: "AUTHOR" },
    ];
  }
}
export default RoleSysEnum;
