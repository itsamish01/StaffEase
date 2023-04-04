import { SubmitReview } from "../components/form";
import { useMutation } from "@apollo/client";
import { SAVE_REVIEW } from "../schema/mutations";
export default function Review() {
  const [saveReview] = useMutation(SAVE_REVIEW);
  const submitReview = async (event) => {
    event.preventDefault();
    const reviewFormData = {
      businessName: event.target.businessName.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      rating: event.target.email.valueAsNumber,
      comment: event.target.comment.value,
    };

    try {
      await saveReview({
        variables: { ...reviewFormData },
      });
      console.log(reviewFormData);
      location.replace("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="px-4 text-center">
      <h2>About</h2>
      <form onSubmit={submitReview}>
        <SubmitReview />
        <button
          type="submit"
          className="button mt-4 bg-green-500 hover:bg-green-300"
        >
          Review
        </button>
      </form>
    </main>
  );
}
