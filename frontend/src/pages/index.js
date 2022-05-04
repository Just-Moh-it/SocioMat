import Layout from "../components/Layout";

// Components
import StoriesList from "../components/StoriesList";
import Feed from "../components/Feed";

const Landing = () => {
  return (
    <>
      {/* Hero */}
      <Layout title="Feed">
        <StoriesList />
        <hr />
        <Feed />
      </Layout>
    </>
  );
};

export default Landing;
