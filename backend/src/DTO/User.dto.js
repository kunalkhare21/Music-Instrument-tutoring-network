const userResponseDTO = (user) => {

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };
};

module.exports = {
    userResponseDTO
};