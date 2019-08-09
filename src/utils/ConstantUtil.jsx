export const defaultRole = "ROLE_GUEST";

export const getRole = (roleName) => {
    switch (roleName) {
        case "ROLE_ADMIN":
            return "管理员";
        case "ROLE_GUEST":
            return "游客";
        case "ROLE_USER":
            return "普通会员";
        case "ROLE_VIP":
            return "尊享会员";
        default:
            return "未知";
    }
}