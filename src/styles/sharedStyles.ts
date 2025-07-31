import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  heroText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
    justifyContent: "center",
    alignItems: 'center',
    fontFamily: 'Futura-Bold',
  },
  subText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    lineHeight: 20,
  },
  trendingSection: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'Futura-Bold',
    color: '#444'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    width: 220,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  cardGrid: {
    flex: 1,
    width: 240,
    maxWidth: '50%',
    marginRight: 4,
    marginVertical: 4,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: 260,
  },
  cardGridImage: {
    width: '100%',
    resizeMode: 'cover',
    height: 220,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Futura-Bold',
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 6,
    color: '#888',
    fontFamily: 'Worksans-Regular',
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#a1a1aa",
  },
  gridContainer: {
    paddingBottom: 20,
    paddingHorizontal: 6,
  }
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heroText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Futura-Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Futura-Bold',
  },
});

export default sharedStyles;