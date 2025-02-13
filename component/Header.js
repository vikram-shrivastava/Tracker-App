import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavItem = ({ title, icon, isActive = false }) => (
    <TouchableOpacity style={[styles.navItem, isActive && styles.navItemActive]}>
      <Ionicons name={icon} size={24} color={isActive ? "#1A237E" : "#666"} />
      <Text style={[styles.navText, isActive && styles.navTextActive]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>ENIGMA</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-circle-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons name={isMenuOpen ? "close" : "menu"} size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.navbar}>
          <NavItem title="Dashboard" icon="home-outline" isActive={true} />
          <NavItem title="All" icon="people-outline" />
          <NavItem title="Audit" icon="folder-outline" />
          <NavItem title="Calendar" icon="calendar-outline" />
          <NavItem title="Settings" icon="settings-outline" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    
    backgroundColor: '#fff',
  },
  header: {
   
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTop: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  menuButton: {
    padding: 8,
    marginLeft: 8,
    display: 'none', 
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#F5F7FA',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    color: '#1A237E',
    fontWeight: '500',
  },
  '@media (max-width: 768px)': {
    menuButton: {
      display: 'flex',
    },
    navbar: {
      display: 'none',
    },
  },
});