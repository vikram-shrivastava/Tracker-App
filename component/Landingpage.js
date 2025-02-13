import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userList] = useState([
    { id: '1', name: 'John Smith', role: 'Project Manager', status: 'Active', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Sarah Johnson', role: 'Lead Developer', status: 'In Meeting', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Michael Chen', role: 'UI/UX Designer', status: 'Away', avatar: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Emma Wilson', role: 'Product Owner', status: 'Active', avatar: 'https://via.placeholder.com/50' },
  ]);

  const filteredUsers = userList.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Filtered Users:', filteredUsers); // Debugging log

  const handleUserPress = (user) => {
    console.log('User pressed:', user.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Target Dashboard</Text>

        <StatisticsCard />
        <SearchBar onSearch={setSearchQuery} />

        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Team Members</Text>

          {filteredUsers.length === 0 ? (
            <Text style={styles.noUsersText}>No users found</Text>
          ) : (
            <FlatList
              data={filteredUsers}
              renderItem={({ item }) => (
                <UserItem user={item} />
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const UserItem = ({ user, onPress }) => {
  const statusColor = {
    'Active': '#4CAF50',
    'Away': '#FFC107',
    'In Meeting': '#2196F3'
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.userItem}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}>{user.role}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: statusColor[user.status] || '#666' }]} />
        <Text style={styles.statusText}>{user.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchBar = ({ onSearch }) => (
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search users..."
      onChangeText={onSearch}
      placeholderTextColor="#999"
    />
  </View>
);

const StatisticsCard = () => (
  <View style={styles.statsContainer}>
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>12</Text>
      <Text style={styles.statLabel}>Active Users</Text>
    </View>
    <View style={styles.statDivider} />
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>85%</Text>
      <Text style={styles.statLabel}>Engagement</Text>
    </View>
    <View style={styles.statDivider} />
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>24</Text>
      <Text style={styles.statLabel}>Tasks</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A237E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
  },
  statLabel: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 4,
  },  
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 15,
  },
  noUsersText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});