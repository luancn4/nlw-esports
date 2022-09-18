import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { GameParams } from '../../@types/navigation';
import { useNavigation } from '@react-navigation/native';

import { Background } from '../../components/Background';

import { THEME } from '../../theme';
import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');
  const route = useRoute();
  const navigation = useNavigation();

  const game = route.params as GameParams;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDiscordUser = async (adsId: string) => {
    console.log("Ad id: ", adsId)
    fetch(`http://192.168.15.85:3333/ads/${adsId}/discord`)
      .then((res) => res.json())
      .then((data) => setDiscordDuoSelected(data.discord))
  };

  useEffect(() => {
    fetch(`http://192.168.15.85:3333/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setAds(data));
  }, []);

  console.log(ads);

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>

            <Image source={logoImg} style={styles.logo} />
            <View style={styles.right} />
          </View>

          <Image
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

          <FlatList
            data={ads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DuoCard onConnect={() => getDiscordUser(item.id)} data={item} />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={
              ads.length > 0 ? styles.contentList : styles.emptyListContent
            }
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda.
              </Text>
            )}
          />
          <DuoMatch
            visible={discordDuoSelected.length > 0}
            onClose={() => setDiscordDuoSelected('')}
            discord={discordDuoSelected}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}
