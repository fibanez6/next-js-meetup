import Image from "next/image";
import { useRouter } from "next/router";
import { Meetup } from "../../types/meetup";
import Card from "../ui/Card";
import styles from "./MeetupItem.module.css";

const MeetupItem = (meetup: Meetup) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push(`/meetups/${meetup.id}`);
  }

  return (
    <li className={styles.item}>
      <Card>
        <div className={styles.image}>
          <Image src={meetup.image} alt={meetup.title} width={640} height={320} />
        </div>
        <div className={styles.content}>
          <h3>{meetup.title}</h3>
          <address>{meetup.address}</address>
        </div>
        <div className={styles.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;