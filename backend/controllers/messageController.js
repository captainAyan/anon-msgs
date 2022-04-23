const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Message = require("../models/messageModel");
const messageSchema = require("../util/messageValidationSchema");

const getMessages = asyncHandler(async (req, res, next) => {
  const LIMIT = 10;
  const PAGE = req.query.page || 0;
  try {
    const m = await Message.find({ user_id: req.user.id })
      .sort("-created_at")
      .skip(PAGE * LIMIT)
      .limit(LIMIT);

    const messages = [];

    for (let i = 0; i < m.length; i += 1) {
      const message = m[i];
      messages.push({
        id: message.id,
        body: message.body,
        created_at: message.created_at,
      });
    }

    const response = {
      skip: PAGE * LIMIT,
      limit: LIMIT,
      total: await Message.find({ user_id: req.user.id }).count(),
      messages,
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    const error1 = new Error("Unknown error");
    error1.status = StatusCodes.INTERNAL_SERVER_ERROR;
    next(error1);
  }
});

const sendMessage = asyncHandler(async (req, res, next) => {
  const { error } = messageSchema.validate({
    body: req.body.body,
    username: req.params.username,
  });

  if (!error) {
    const { body } = req.body;
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        const error1 = new Error("Username not found");
        error1.status = StatusCodes.NOT_FOUND;
        next(error1);
        return;
      }

      const message = await Message.create({
        user_id: user.id,
        body,
      });

      const response = {
        id: message.id,
        body: message.body,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
        },
      };

      res.status(StatusCodes.CREATED).json(response);
    } catch (error1) {
      const error2 = new Error("Unknown error");
      error2.status = StatusCodes.INTERNAL_SERVER_ERROR;
      next(error2);
    }
  } else {
    const error1 = new Error("Invalid input error");
    error1.status = StatusCodes.BAD_REQUEST;
    next(error1);
  }
});

const deleteMessage = asyncHandler(async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.message_id);

    if (!message) {
      const error = new Error("Message not found");
      error.status = StatusCodes.NOT_FOUND;
      next(error);
      return;
    }

    if (message.user_id.toString() !== req.user.id) {
      const error = new Error("User not authorized");
      error.status = StatusCodes.BAD_REQUEST;
      next(error);
      return;
    }

    await message.remove();

    res.status(StatusCodes.OK).json({
      id: message.id.toString(),
    });
  } catch (error) {
    const error2 = new Error("Unknown error");
    error2.status = StatusCodes.INTERNAL_SERVER_ERROR;
    next(error2);
  }
});

module.exports = { getMessages, sendMessage, deleteMessage };
