import React,{useState, useEffect} from 'react';
import {StyleSheet, FlatList, StatusBar, Text, TextInput, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5', // Subtle light gray background
    },
    searchLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    itemContainer: {
        borderWidth: 2, // Strong border
        borderColor: '#007bff', // Bright blue for the border color
        borderRadius: 12, // Rounded corners for the card
        padding: 15,
        marginVertical: 10, // Space between cards
        backgroundColor: '#ffffff', // White background for cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4, // Shadow depth for Android
    },
    yearText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1a73e8', // Bright blue for emphasis
        marginBottom: 5,
    },
    scoreText: {
        fontSize: 16,
        color: '#555', // Neutral gray for secondary text
        marginBottom: 5,
    },
    winningTeamText: {
        fontSize: 16,
        color: '#34a853', // Green for positive emphasis
    },
   losingTeamText:{
        fontSize: 16,
        color: 'red', // Green for positive emphasis
    },

    VS:{
        color:'black'
    },

    bold:{
        fontWeight: 'bold',
        color:'black',
    },

    headerText: {
        fontSize: 30,              // Large font size
        fontWeight: 'bold',        // Bold text
        color: '#1a73e8',          // Bright blue for emphasis
        textAlign: 'center',      // Center-align the text
        marginTop: 20,             // Top margin for spacing
        marginBottom: 15,          // Bottom margin for spacing
        letterSpacing: 2,          // Slight letter spacing for a polished look
    },
});



let originalData = [];

const App = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=fifachamptionsmensoccer&format=json&case=default")
        .then((response) =>{
          return response.json();
        })
        .then((myJson) => {
          if(originalData.length < 1){
            setMyData(myJson);
            originalData = myJson;
          }
        })
  }, [])


    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.WinningTeam.toLowerCase().includes(text.toLowerCase()) ||
                item.LosingTeam.toLowerCase().includes(text.toLowerCase()) ||
                item.Year.toString().includes(text)
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };


    const renderItem = ({item, index}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.yearText}> <Text style={styles.bold}> Year: </Text> {item.Year}</Text>
            <Text style={styles.scoreText}>  <Text style={styles.bold}> Final Score: </Text> {item.Score}</Text>
            <Text style={styles.winningTeamText}><Text style={styles.bold}> Matchup: </Text>{item.WinningTeam} <Text style={styles.VS}> VS </Text> <Text style={styles.losingTeamText}>{item.LosingTeam}</Text></Text>
        </View>

    );
  };

  return (
      <View style={styles.container}>
        <StatusBar/>
          <Text style={styles.headerText}>FIFA WORLD CUP</Text>
        <Text style={styles.searchLabel} >Search for your favourite teams</Text>
        <TextInput style={styles.textInput}  placeholder="Enter team name or year..." onChangeText={(text) => {FilterData(text)}}/>
        <FlatList data={mydata} renderItem={renderItem} />
      </View>
  );
}

export default App;
