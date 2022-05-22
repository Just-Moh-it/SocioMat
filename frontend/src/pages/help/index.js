import Layout from "../../components/Layout";
import TabControl from "../../components/TabControl";
import Image from "next/image";

import snarkdown from "snarkdown";

// Questions
import { faqs } from "../../utils/constants";

const HelpPage = () => {
  return (
    <Layout title="Chats" noSidebar>
      <TabControl
        title="Help Topics"
        data={[
          {
            info: {
              iconUri: "/assets/icons/filled/question-mark.svg",
              text: "Having problems connecting?",
            },
            content: getContent(faqs.having_problems_connecting),
          },
          {
            info: {
              iconUri: "/assets/icons/filled/question-mark.svg",
              text: "About the project",
            },
            content: getContent(faqs.having_problems_connecting),
          },
          {
            info: {
              iconUri: "/assets/icons/filled/question-mark.svg",
              text: "How to get ripped of easily?",
            },
            content: getContent(faqs.social_links),
          },
          {
            info: {
              iconUri: "/assets/icons/filled/question-mark.svg",
              text: "How to get ripped of easily?",
            },
            content: "",
          },
        ]}
      />
    </Layout>
  );
};

const getContent = (text) => (
  <>
    <div
      dangerouslySetInnerHTML={{
        __html: snarkdown(text),
      }}
      className="markdown"
    />
  </>
);

export default HelpPage;
