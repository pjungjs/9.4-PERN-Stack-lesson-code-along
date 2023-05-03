import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review.js';
import ReviewForm from './ReviewForm.js';
//STOOOOOOOOP
const API = process.env.REACT_APP_API_URL;

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API}/bookmarks/${id}/reviews`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.warn(error))
  }, [id])

  const handleAdd = (newReview) => {
    axios
      .post(`${API}/bookmarks/${id}/reviews`, newReview)
      .then((response) => {
          setReviews([response.data, ...reviews]);
        },
          (error) => console.error(error)
      )
      .catch((e) => console.warn("catch", e))
  }

  const handleDelete = (id) => {
    axios
      .delete(`${API}/bookmarks/${id}/reviews/${id}`)
      .then((response) => {
          const copyReviewArray = [...reviews];
          const indexDeletedReview = copyReviewArray.findIndex((review) => {
            return review.id === id;
          })
          //use the index, and match it with the copy of the state's array of objects
          //cut off the matching state with the id
          copyReviewArray.splice(indexDeletedReview, 1);
          setReviews(copyReviewArray);
        },
          (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c))
  }

  const handleEdit = (updatedReview) => {
    axios
      .put(`${API}/bookmarks/${id}/reviews/${updatedReview.id}`, updatedReview)
      .then((response) => {
        const copyReviewArray = [...reviews];
        const indexUpdatedReview = copyReviewArray.findIndex((review) => {
          return review.id === updatedReview.id;
        })
        copyReviewArray[indexUpdatedReview] = response.data;
        setReviews(copyReviewArray)
      })
      .catch((c) => console.warn("catch", c))
  }

  return (
    <section className="Reviews">
      <h2>Reviews</h2>
      <ReviewForm handleAdd={handleAdd}>
        <h3>Add a New Review</h3>
      </ReviewForm>

      {
        reviews.map((review) => {
          return <Review key={review.id} review={review}
            handleDelete={handleDelete} handleEdit={handleEdit}
          />
        })
      }
    </section>
  )
}

export default Reviews;