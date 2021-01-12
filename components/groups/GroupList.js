import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  List,
  Divider,
  Button,
  Portal,
  Dialog,
  TextInput,
  Text,
  Chip,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import LightHeader from '../layouts/LightHeader';
import {useHistory} from 'react-router-dom';
import {getTagByName} from '../../api/tags';
import listStyles from '../../styles/groups/list';
import Loading from './Loading';

const styles = StyleSheet.create(listStyles);

const GroupList = () => {
  let history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [choosedTags, setChoosedTags] = useState([]);
  const [tag, setTag] = useState('');
  const [check, showRoomWithTags] = useState(false);

  function findTag(text) {
    setTag(text);
    if (text.length > 1) {
      getTagByName(text)
        .then((tags) => setChoosedTags(tags))
        .catch((err) => console.log(err, 'Setup getTagByName error'));
    }
  }

  function addToTags(tg) {
    if (tags.indexOf(tg) !== -1) {
      return;
    }
    setTags((p) => [...p, tg]);
  }

  function find() {
    for (var i = 0; i < rooms.length; i++) {
      for (var j = 0; j < rooms[i].tags.length; j++) {
        for (var k = 0; k < tags.length; k++) {
          if (tags[k] === rooms[i].tags[j]) {
            showRoomWithTags(true);
          }
        }
      }
    }
  }

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('rooms')
      .onSnapshot((querySnapshot) => {
        const rooms = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            topic: '',
            ...documentSnapshot.data(),
          };
        });

        setRooms(rooms);

        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <LightHeader title="Join to a themathic room" />

      <Portal>
        <Dialog
          visible={showTagModal}
          onDismiss={() => setShowTagModal((p) => !p)}>
          <Dialog.Title>Add interests</Dialog.Title>
          <Dialog.Content>
            <TextInput
              placeholder="Type word"
              underlineColor="transparent"
              mode="flat"
              style={styles.findTag}
              onChangeText={(text) => findTag(text)}
              value={tag}
            />
            <View style={styles.row}>
              {choosedTags.length === 0 && <Text>Nothing was found</Text>}
              {choosedTags.length !== 0 &&
                choosedTags.map((tg, i) => (
                  <Chip
                    key={i}
                    mode="outlined"
                    style={styles.chips}
                    onPress={() => addToTags(tg.name)}>
                    {tg.name}
                  </Chip>
                ))}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowTagModal(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View>
        <Text style={{fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>
          Choose your interests
        </Text>

        <View style={styles.row}>
          {tags.map((tg, i) => (
            <Chip
              key={i}
              mode="outlined"
              style={styles.chips}
              onPress={() => setTags((p) => p.filter((_, idx) => idx !== i))}>
              {tg}
            </Chip>
          ))}
          <Chip
            mode="outlined"
            style={styles.chips}
            onPress={() => setShowTagModal(true)}>
            +
          </Chip>
          <Button onPress={() => find()}>Find</Button>
        </View>
      </View>

      {check && (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item}) => (
            <>
              <List.Item
                title={item.name}
                description={'Topic: ' + item.topic}
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
              />
              <Button
                style={styles.fixedBtn}
                mode="contained"
                onPress={() =>
                  history.push({
                    pathname: '/groups/groupchatting',
                    state: item,
                  })
                }>
                Join
              </Button>
            </>
          )}
        />
      )}
    </View>
  );
};

export default GroupList;
