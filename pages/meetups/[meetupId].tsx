import MeetupDetails from "../../components/meetups/MeetupDetails";
import { Collection, Db, MongoClient, ObjectId, WithId } from 'mongodb';
import { DUMMY_MEETUPIDS } from '../../dummy';
import { MeetupDoc } from "../../types/meetup";
import clientPromise from "../../lib/mongodb";
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

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

  // console.log(DUMMY_MEETUPIDS);

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
    // -- Generates the pages when it nneeds them
    fallback: 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
// It will runs this function #meetups times by getStaticPaths
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const meetupId = params!.meetupId as string;

  // fetch data from an API
  const client: MongoClient = await clientPromise;
  const db: Db = client.db();
  const meetupCollection: Collection<MeetupDoc> = db.collection('meetups');
  const selectedMeetup: WithId<MeetupDoc> | null = await meetupCollection.findOne({ _id: new ObjectId(meetupId) });

  // console.log(selectedMeetup?._id.toString())

  return {
    props: {
      meetup: {
        image: selectedMeetup?.image,
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        description: selectedMeetup?.description
      }
    }
  }
}

const meetupId = ({ meetup }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MeetupDetails
        image={meetup.image}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
      />
    </>
  );
}

export default meetupId;