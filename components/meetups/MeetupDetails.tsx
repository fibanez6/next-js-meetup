import Image from "next/image";
import { MeetupFormData } from "../../types/meetup";
import styles from "./MeetupDetails.module.css";

const MeetupDetails = (meetup: MeetupFormData) => {
  return (
    <section className={styles.detail}>
      <Image src={meetup.image} alt={meetup.title} width={320} height={480} />
      <h1>{meetup.title}</h1>
      <address>{meetup.address}</address>
      <p>{meetup.description}</p>
    </section>
  );
}

export default MeetupDetails;