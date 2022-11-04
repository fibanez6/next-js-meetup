import MeetupDetails from "../../components/meetups/MeetupDetails";
import { Collection, Db, MongoClient } from 'mongodb';
import { DUMMY_MEETUPIDS } from '../../dummy';
import { MeetupDoc } from "../../types/meetup";
import clientPromise from "../../lib/mongodb";
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from "next";

// This will generate an user details page for each user in the fetched array
// It will only run during build in production, it will not be called during
// runtime. You can validate code written inside getStaticPaths is removed from
// the client-side bundle
// Generates `/meetups/1, `/meetups/2` and so on.
export const getStaticPaths: GetStaticPaths = async () => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db();
  const meetupCollection: Collection<MeetupDoc> = db.collection('meetups');
  const meetups: MeetupDoc[] = await meetupCollection.find({}, { projection: { _id: 1 } }).toArray(); // only fetch ids
  client.close();

  console.log(DUMMY_MEETUPIDS);

  return {
    // paths: DUMMY_MEETUPIDS,
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    })),

    // FALSE 
    // -- paths contains all supported meetupId values, otherwise 404 error
    // -- getStaticProps runs during next build for any paths returned during build
    // TRUE 
    // -- it would try to generate a page for this meetupId dynamically on the
    // server for the incoming request.
    // -- getStaticProps runs in the background 
    // BLOCKING 
    // -- getStaticProps is called before initial render 
    fallback: false
  }
}

// `getStaticPaths` requires using `getStaticProps`
// It will runs this function #meetups times by getStaticPaths
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const meetupId = params!.meetupId as string;

  // fetch data from an API
  return {
    props: {
      meetupsData: {
        image: "https://images.unsplash.com/photo-1667379586896-ce8d7844eb0b",
        title: "title",
        address: "address",
        description: "description"
      }
    }
  }
}


const meetupId = ({ meetupsData }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <MeetupDetails
      image={meetupsData.image}
      title={meetupsData.title}
      address={meetupsData.address}
      description={meetupsData.description}
    />
  );
}

export default meetupId;