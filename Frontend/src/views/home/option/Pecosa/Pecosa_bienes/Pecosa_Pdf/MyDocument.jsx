import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';

const URI = 'http://localhost:8000/pecosapedidos/'

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,

  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});


const MyDocument = () => {
  //const [contend,getContent] = useState([])
  
  return(
  <Document>
  <Page  size="A4" orientation="landscape"  style={styles.body}>
    <Text style={styles.header} fixed></Text>
   {/* <Image style={styles.image} src={LebronStretch} />*/}
    <Text style={styles.text}>
      Oh right. I forgot about the battle. Wow, you got that off the
      Internet? In my day, the Internet was only used to download
      pornography. I don't know what you did, Fry, but once again, you
      screwed up! Now all the planets are gonna start cracking wise about
      our mamas. She also liked to shut up! We'll go deliver this crate like
      professionals, and then we'll go home. In your time, yes, but nowadays
      shut up! Besides, these are adult stemcells, harvested from perfectly
      healthy adults whom I killed for their stemcells. And I'm his friend
      Jesus. Incidentally, you have a dime up your nose. Oh, you're a dollar
      naughtier than most. Bender, being God isn't easy. If you do too much,
      people get dependent on you, and if you do nothing, they lose hope.
      You have to use a light touch. Like a safecracker, or a pickpocket.
      And why did 'I' have to take a cab? Perhaps, but perhaps your
    </Text>
    <Text
      style={styles.pageNumber}
      render={({ pageNumber, totalPages }) =>
        `${pageNumber} / ${totalPages}`
      }
    />
  </Page>
</Document>
);
    }

export default MyDocument;
