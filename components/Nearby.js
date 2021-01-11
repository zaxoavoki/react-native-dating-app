import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import {Link} from 'react-router-native';
import GetLocation from 'react-native-get-location';
import distance from 'gps-distance';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

import nearbyStyles from '../styles/nearby';
import LightHeader from './layouts/LightHeader';
import {getNearbyUsers} from '../api/location';
import {getUserById} from '../api/user';
import AppContext from '../contexts/AppContext';

const styles = StyleSheet.create(nearbyStyles);

function Nearby() {
  const {user} = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [init, setInit] = useState(true);

  useEffect(() => {
    let isMounted = true;

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((loc) => {
        if (isMounted) {
          getUserById(user.uid)
            .then((u) =>
              getNearbyUsers(u.interestedIn, loc)
                .then((res) => {
                  setUsers(
                    res
                      .filter((e) => e.email !== user.email)
                      .filter((e) => e.age >= u.minAge)
                      .map((e) => ({
                        ...e,
                        distance: distance(
                          loc.latitude,
                          loc.longitude,
                          e.location.latitude,
                          e.location.longitude,
                        ),
                      }))
                      .sort((a, b) => a.distance - b.distance),
                  );
                })
                .catch((err) => {
                  console.error(err);
                  setUsers([]);
                })
                .then(() => setInit(false)),
            )
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.warn(err));

    return () => {
      isMounted = false;
    };
  }, []);

  if (init) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LightHeader title="People nearby" />

        {users.length === 0 && (
          <View style={styles.notFoundView}>
            <FontAwesomeIcon
              style={styles.icon}
              size={150}
              icon={faMapMarkerAlt}
            />
            <Text style={styles.notFound}>There is no one near you</Text>
          </View>
        )}

        {users.length > 0 && (
          <View style={styles.images}>
            {users.map((usr, i) => (
              <View key={i} style={styles.imageBlock}>
                <Link component={TouchableOpacity} to={`/profile/${usr.uid}`}>
                  <>
                    <Image source={{uri: usr.picture}} style={styles.image} />
                    <Text style={styles.distance}>
                      {usr.distance.toFixed(2)} km
                    </Text>
                  </>
                </Link>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Nearby;
