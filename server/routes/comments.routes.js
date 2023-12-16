const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");
const { isLoggedIn, isValidId } = require("../middleware/custom-middleware");

class CommentFactory {
  static createComment(data) {
    return new Comment(data);
  }
}

// CommentController.js
class CommentController {
  static getCourseComments(req, res) {
    Comment.find({ course: req.params.id })
      .populate("user")
      .sort({ createdAt: -1 })
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  }

  static newComment(req, res) {
    CommentFactory.createComment(req.body)
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  }

  static editComment(req, res) {
    Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  }

  static deleteComment(req, res) {
    Comment.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: "Comment Deleted" }))
      .catch((err) => res.status(500).json(err));
  }
}

router.get(
  "/getCourseComments/:id",
  isValidId,
  CommentController.getCourseComments
);
router.post("/newComment", isLoggedIn, CommentController.newComment);
router.put(
  "/editComment/:id",
  isLoggedIn,
  isValidId,
  CommentController.editComment
);
router.delete(
  "/deleteComment/:id",
  isLoggedIn,
  isValidId,
  CommentController.deleteComment
);

module.exports = router;
