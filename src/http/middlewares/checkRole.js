import RoleSysEnum from "../../enums/RoleSysEnum";

const checkAdminRole = (req, res, next) => {
  const { role } = req.user;
  if (!role || +role !== +RoleSysEnum.ADMIN) {
    return res.status(401).json({ mes: "Bạn phải là admin" });
  }

  next();
};

const checkAuthorRole = (req, res, next) => {
  const { role } = req.user;

  if (!role || role !== RoleSysEnum.AUTHOR) {
    return res.status(401).json({ mes: "Bạn phải là tác giả" });
  }

  next();
};

const checkAdminOrAuthorRole = (req, res, next) => {
  const { role } = req.user;

  if (!role || (role !== RoleSysEnum.ADMIN && role !== RoleSysEnum.AUTHOR)) {
    return res.status(401).json({ mes: "Bạn phải là admin hoặc tác giả" });
  }

  next();
};

export { checkAdminRole, checkAuthorRole, checkAdminOrAuthorRole };
