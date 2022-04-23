const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Message = require("../models/messageModel");
const editProfileSchema = require("../util/editProfileValidationSchema");

const getProfile = asyncHandler(async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      const error1 = new Error("Username not found");
      error1.status = StatusCodes.NOT_FOUND;
      next(error1);
      return;
    }

    const response = {
      id: user.id,
      name: user.name,
      username: user.username,
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    const error1 = new Error("Unknown error");
    error1.status = StatusCodes.INTERNAL_SERVER_ERROR;
    next(error1);
  }
});

const editProfile = asyncHandler(async (req, res, next) => {
  const { error } = editProfileSchema.validate(req.body);

  if (!error) {
    const { name, username } = req.body;

    try {
      const user = await User.findById(req.user.id);

      user.name = name;
      user.username = username;

      await user.save();

      const response = {
        id: user.id,
        name,
        username,
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error1) {
      let error2;
      if (error1.code === 11000) {
        error2 = new Error("Username already exists");
        error2.status = StatusCodes.BAD_REQUEST;
      } else {
        error2 = new Error("Unknown error");
        error2.status = StatusCodes.INTERNAL_SERVER_ERROR;
      }
      next(error2);
    }
  } else {
    const error1 = new Error("Invalid input error");
    error1.status = StatusCodes.BAD_REQUEST;
    next(error1);
  }
});

const deleteProfile = asyncHandler(async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.user.id });
    await Message.deleteMany({ user_id: req.user.id });

    res.status(StatusCodes.OK).json({
      id: req.user.id,
    });
  } catch (error) {
    const error1 = new Error("Unknown error");
    error1.status = StatusCodes.INTERNAL_SERVER_ERROR;
    next(error1);
  }
});

module.exports = { getProfile, editProfile, deleteProfile };
