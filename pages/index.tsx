import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import clientPromise from "../lib/mongodb";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
// import { DUMMY_MEETUPS } from '../dummy'

// This function gets called on each incoming request.
// This only runs on server-side and never runs on the browser
// export const getServerSideProps = async (context) => {
//   const req = context.req; // i.e for authentication
//   const res = context.res;

//   // fetch data from an API
//   return {
//     // will be passed to the page component as props
//     props: { meetups: DUMMY_MEETUPS }
//   }
// }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in.
// This only runs on server-side and never runs on the browser
export const getStaticProps: GetStaticProps = async () => {

  // fetch data from an API
  try {
    const client = await clientPromise;
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find().toArray();

    return {
      // It will be passed to the page component as props
      // props: { meetups: DUMMY_MEETUPS },
      props: {
        meetups: meetups.map(meetup => ({
          id: meetup._id.toString(),
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
        }))
      },
  
      // It will attempt to re-generate the page after the deploment:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
  } catch (e) {
    console.error(e)
    return {
      props: { meetups: [] },
    }
  }
}

const HomePage = ({ meetups }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    // send a http request and fetch data
    setLoadedMeetups(meetups);
  }, [])

  return (
    <>
      <h1>MeetupList</h1>
      <MeetupList meetups={loadedMeetups} />
    </>
  );
}

export default HomePage;