import { useRef } from "react";
import Card from '../ui/Card';
import styles from "./NewMeetupForm.module.css";

type Props = {
  onAddMeetup: Function
}

const NewMeetupForm = ({ onAddMeetup }: Props) => {
  const titleInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imageInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const addressInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const descriptionInputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows={5}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={styles.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;