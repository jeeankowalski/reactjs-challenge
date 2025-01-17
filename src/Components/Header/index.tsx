import React from 'react';
import { DrawerHeaderProps } from '@react-navigation/drawer';

import { removeRepoList, removeUserName } from '../../services/storage';

import { useAppSelector } from '../../hooks';
import { selectUser } from '../../userSlice';
import { Image } from 'react-native';


import { Container, MenuIcon, TitleContainer, TitleText, UserContainer, UserText } from './styles';
import { TouchableOpacity } from 'react-native';

const Header = (props: DrawerHeaderProps) => {
  const userData = useAppSelector(selectUser);

  const handleLogout = async () => {
    await removeRepoList();
    await removeUserName();    

    props.navigation.navigate('Login');
  }

  return (
    <Container>
      <UserContainer>
        <Image source={{uri: userData.avatar_url}} style={{width: 50, height: 50, borderRadius: 50}}></Image>
        <UserText>Olá, {userData.name}!</UserText>
      </UserContainer>
      
      <TitleContainer>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <MenuIcon name='menu' size={28}/>
        </TouchableOpacity>
        <TitleText>{props.route.name}</TitleText>     
        <TouchableOpacity onPress={() => handleLogout()}>
          <MenuIcon name='log-out' size={20}/>
        </TouchableOpacity>
      </TitleContainer> 
    </Container>
  );

}

export default Header;