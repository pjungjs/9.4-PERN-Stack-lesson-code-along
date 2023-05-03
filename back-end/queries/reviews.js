const db = require("../db/dbConfig.js");

const getAllReviews = async (bookmarkId) => {
  try {
    const allReviews = await db.any("SELECT * FROM reviews WHERE bookmark_id=$1", bookmarkId);
    return allReviews;
  } catch (error) {
    return error;
  }
};

const getReview = async (id) => {
  try {
    const oneReview = await db.one("SELECT * FROM reviews WHERE id=$1", id);
    return oneReview;
  } catch (error) {
    return error;
  }
};

const createReview = async (review) => {
  try {
    const newReview = await db.one(
      "INSERT INTO reviews (bookmark_id, reviewer, title, content, rating) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [review.bookmark_id, review.reviewer, review.title, review.content, review.rating]
    );
    return newReview;
  } catch (error) {
    return error;
  }
};

const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE id=$1 RETURNING *",
      id
    );
    return deletedReview;
  } catch (error) {
    return error;
  }
};

const updateReview = async (id, review) => {
  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET bookmark_id=$1, reviewer=$2, title=$3, content=$4, rating=$5 WHERE id=$6 RETURNING *",
      [review.bookmark_id, review.reviewer, review.title, review.content, review.rating, id]
    );
    return updatedReview;
  } catch (error) {
    return error;
  }
};


module.exports = { getAllReviews, createReview, getReview, deleteReview, updateReview };