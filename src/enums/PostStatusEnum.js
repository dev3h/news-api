class PostStatusEnum {
  static PRIVATE = 0;
  static PUBLIC = 1;
  static SCHEDULE = 2;

  static getLabel(status) {
    switch (status) {
      case 0:
        return "Private";
      case 1:
        return "Public";
      case 2:
        return "Schedule";
      default:
        return "Unknown";
    }
  }
  static getAll() {
    return [
      { id: PostStatusEnum.PRIVATE, name: "Private" },
      { id: PostStatusEnum.PUBLIC, name: "Public" },
      { id: PostStatusEnum.SCHEDULE, name: "Schedule" },
    ];
  }
}
export default PostStatusEnum;
