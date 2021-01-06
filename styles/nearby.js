export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  images: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  imageBlock: {
    width: '33.3%',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 300,
  },
  distance: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  notFoundView: {
    marginTop: 55,
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
    color: '#ddd',
    margin: 'auto',
  },
  notFound: {
    marginTop: 20,
    fontSize: 15,
    color: '#aaa',
  },
};
