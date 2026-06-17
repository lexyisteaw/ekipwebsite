"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

// Veri tipleri
export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  participants: number;
  distance: string;
  status: string;
  description?: string;
  image?: string;
  photos?: string[];
  route?: string[];
  highlights?: string[];
  recommendations?: string[];
  duration?: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  url: string;
  category: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: string;
}

export interface Member {
  id: number;
  name: string;
  surname: string;
  age?: number;
  city?: string;
  bloodType?: string;
  bike?: string;
  bikeModel?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  telegram?: string;
  photo?: string;
  coverImage?: string;
  badgeTitle?: string;
  badgeVariant?: string;
  profileEffect?: string;
  gallery?: string[];
  bio?: string;
  joinDate?: string;
  totalEvents?: number;
  totalKm?: number;
}

export interface Sponsor {
  id: number;
  name: string;
  category?: string;
  description?: string;
  workmanship?: string;
  discountText?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  mapsUrl?: string;
  address?: string;
  logo?: string;
  coverImage?: string;
  gallery?: string[];
  videos?: string[];
  featured?: boolean;
}

export interface NewsPost {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  category?: string;
  image?: string;
  gallery?: string[];
  videos?: string[];
  featured?: boolean;
  date?: string;
}

export interface Announcement {
  id: number;
  text: string;
  link?: string;
  isActive?: boolean;
  priority?: number;
  createdAt?: string;
}

export interface AboutContent {
  description: string;
  mission: string;
  totalMembers: number;
  annualEvents: number;
  totalKm: number;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  contactEmail: string;
  instagram: string;
  phone: string;
}

interface DataContextType {
  events: Event[];
  galleryImages: GalleryImage[];
  messages: Message[];
  members: Member[];
  sponsors: Sponsor[];
  newsPosts: NewsPost[];
  announcements: Announcement[];
  aboutContent: AboutContent;
  siteSettings: SiteSettings;
  loading: boolean;
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (id: number, event: Omit<Event, 'id'>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => Promise<void>;
  updateGalleryImage: (id: number, image: Omit<GalleryImage, 'id'>) => Promise<void>;
  deleteGalleryImage: (id: number) => Promise<void>;
  addMessage: (message: Omit<Message, 'id'>) => Promise<void>;
  deleteMessage: (id: number) => Promise<void>;
  markMessageAsRead: (id: number) => Promise<void>;
  addMember: (member: Omit<Member, 'id'>) => Promise<void>;
  updateMember: (id: number, member: Omit<Member, 'id'>) => Promise<void>;
  deleteMember: (id: number) => Promise<void>;
  addSponsor: (sponsor: Omit<Sponsor, 'id'>) => Promise<void>;
  updateSponsor: (id: number, sponsor: Omit<Sponsor, 'id'>) => Promise<void>;
  deleteSponsor: (id: number) => Promise<void>;
  addNewsPost: (post: Omit<NewsPost, 'id'>) => Promise<void>;
  updateNewsPost: (id: number, post: Omit<NewsPost, 'id'>) => Promise<void>;
  deleteNewsPost: (id: number) => Promise<void>;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => Promise<void>;
  updateAnnouncement: (id: number, announcement: Omit<Announcement, 'id'>) => Promise<void>;
  deleteAnnouncement: (id: number) => Promise<void>;
  updateAboutContent: (content: AboutContent) => Promise<void>;
  updateSiteSettings: (settings: SiteSettings) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultAboutContent: AboutContent = {
  description: "68 Riders, tutkulu motosiklet severlerin bir araya gelerek oluşturduğu bir kardeşliktir.",
  mission: "Motosiklet tutkusunu paylaşan insanları bir araya getirmek ve unutulmaz anılar biriktirmek.",
  totalMembers: 68,
  annualEvents: 12,
  totalKm: 1000,
};

const defaultSiteSettings: SiteSettings = {
  siteName: "68 RIDERS",
  siteTagline: "Ride Beyond Limits",
  contactEmail: "68Riders@protonmail.com",
  instagram: "@68_riders",
  phone: "+90 5XX XXX XX XX",
};

function throwSupabaseError(action: string, error: unknown): never {
  console.error(`${action}:`, error);

  if (error instanceof Error) {
    throw new Error(`${action}: ${error.message}`);
  }

  if (error && typeof error === "object" && "message" in error) {
    throw new Error(`${action}: ${String((error as { message?: unknown }).message)}`);
  }

  throw new Error(action);
}

// Supabase'den gelen veriyi Member tipine çevir
function mapMember(row: any): Member {
  return {
    id: row.id,
    name: row.name,
    surname: row.surname,
    age: row.age,
    city: row.city,
    bloodType: row.blood_type,
    bike: row.bike,
    bikeModel: row.bike_model,
    instagram: row.instagram,
    tiktok: row.tiktok,
    twitter: row.twitter,
    telegram: row.telegram,
    photo: row.photo,
    coverImage: row.cover_image,
    badgeTitle: row.badge_title,
    badgeVariant: row.badge_variant,
    profileEffect: row.profile_effect,
    gallery: row.gallery || [],
    bio: row.bio,
    joinDate: row.join_date,
    totalEvents: row.total_events,
    totalKm: row.total_km,
  };
}

// Supabase'den gelen veriyi Event tipine çevir
function mapEvent(row: any): Event {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    location: row.location,
    participants: row.participants,
    distance: row.distance,
    status: row.status,
    description: row.description,
    image: row.image,
    photos: row.photos || [],
    route: row.route || [],
    highlights: row.highlights || [],
    recommendations: row.recommendations || [],
    duration: row.duration,
  };
}

// Supabase'den gelen veriyi GalleryImage tipine çevir
function mapGalleryImage(row: any): GalleryImage {
  return {
    id: row.id,
    title: row.title,
    url: row.url,
    category: row.category,
  };
}

// Supabase'den gelen veriyi Message tipine çevir
function mapMessage(row: any): Message {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    date: new Date(row.created_at).toLocaleDateString('tr-TR'),
    status: row.status,
  };
}

function mapSponsor(row: any): Sponsor {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    workmanship: row.workmanship,
    discountText: row.discount_text,
    phone: row.phone,
    instagram: row.instagram,
    website: row.website,
    mapsUrl: row.maps_url,
    address: row.address,
    logo: row.logo,
    coverImage: row.cover_image,
    gallery: row.gallery || [],
    videos: row.videos || [],
    featured: row.featured,
  };
}

function mapNewsPost(row: any): NewsPost {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    category: row.category,
    image: row.image,
    gallery: row.gallery || [],
    videos: row.videos || [],
    featured: row.featured,
    date: row.created_at ? new Date(row.created_at).toLocaleDateString('tr-TR') : undefined,
  };
}

function mapAnnouncement(row: any): Announcement {
  return {
    id: row.id,
    text: row.text,
    link: row.link,
    isActive: row.is_active,
    priority: row.priority || 0,
    createdAt: row.created_at,
  };
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);

  // Tüm verileri Supabase'den yükle
  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      await Promise.all([
        loadMembers(),
        loadEvents(),
        loadGalleryImages(),
        loadMessages(),
        loadSponsors(),
        loadNewsPosts(),
        loadAnnouncements(),
        loadSiteSettings(),
      ]);
    } catch (error) {
      console.error("Veri yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMembers() {
    const { data, error } = await supabase.from('members').select('*').order('id');
    if (error) { console.error('Members yükleme hatası:', error); return; }
    setMembers((data || []).map(mapMember));
  }

  async function loadEvents() {
    const { data, error } = await supabase.from('events').select('*').order('id', { ascending: false });
    if (error) { console.error('Events yükleme hatası:', error); return; }
    setEvents((data || []).map(mapEvent));
  }

  async function loadGalleryImages() {
    const { data, error } = await supabase.from('gallery_images').select('*').order('id');
    if (error) { console.error('Gallery yükleme hatası:', error); return; }
    setGalleryImages((data || []).map(mapGalleryImage));
  }

  async function loadMessages() {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (error) { console.error('Messages yükleme hatası:', error); return; }
    setMessages((data || []).map(mapMessage));
  }

  async function loadSponsors() {
    const { data, error } = await supabase.from('sponsors').select('*').order('id', { ascending: false });
    if (error) { console.error('Sponsors yukleme hatasi:', error); return; }
    setSponsors((data || []).map(mapSponsor));
  }

  async function loadNewsPosts() {
    const { data, error } = await supabase.from('news_posts').select('*').order('id', { ascending: false });
    if (error) { console.error('Haber yukleme hatasi:', error); return; }
    setNewsPosts((data || []).map(mapNewsPost));
  }

  async function loadAnnouncements() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('priority', { ascending: false })
      .order('id', { ascending: false });
    if (error) { console.error('Duyuru yukleme hatasi:', error); return; }
    setAnnouncements((data || []).map(mapAnnouncement));
  }

  async function loadSiteSettings() {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
    if (error || !data) return;
    setAboutContent({
      description: data.about_description || defaultAboutContent.description,
      mission: data.about_mission || defaultAboutContent.mission,
      totalMembers: data.total_members || 68,
      annualEvents: data.annual_events || 12,
      totalKm: data.total_km || 1000,
    });
    setSiteSettings({
      siteName: data.site_name || '68 RIDERS',
      siteTagline: data.site_tagline || 'Ride Beyond Limits',
      contactEmail: data.contact_email || '',
      instagram: data.instagram || '',
      phone: data.phone || '',
    });
  }

  // ---- MEMBER FONKSİYONLARI ----
  const addMember = async (member: Omit<Member, 'id'>) => {
    const { data, error } = await supabase.from('members').insert({
      name: member.name,
      surname: member.surname,
      age: member.age,
      city: member.city,
      blood_type: member.bloodType,
      bike: member.bike,
      bike_model: member.bikeModel,
      instagram: member.instagram,
      tiktok: member.tiktok,
      twitter: member.twitter,
      telegram: member.telegram,
      photo: member.photo,
      cover_image: member.coverImage,
      badge_title: member.badgeTitle,
      badge_variant: member.badgeVariant || 'member',
      profile_effect: member.profileEffect || 'none',
      gallery: member.gallery,
      bio: member.bio,
      join_date: member.joinDate,
      total_events: member.totalEvents || 0,
      total_km: member.totalKm || 0,
    }).select('*').single();
    if (error) throwSupabaseError('Uye ekleme hatasi', error);

    if (data) {
      const newMember = mapMember(data);
      setMembers((current) => [...current.filter((item) => item.id !== newMember.id), newMember]);
    } else {
      await loadMembers();
    }
  };

  const updateMember = async (id: number, member: Omit<Member, 'id'>) => {
    const { data, error } = await supabase.from('members').update({
      name: member.name,
      surname: member.surname,
      age: member.age,
      city: member.city,
      blood_type: member.bloodType,
      bike: member.bike,
      bike_model: member.bikeModel,
      instagram: member.instagram,
      tiktok: member.tiktok,
      twitter: member.twitter,
      telegram: member.telegram,
      photo: member.photo,
      cover_image: member.coverImage,
      badge_title: member.badgeTitle,
      badge_variant: member.badgeVariant || 'member',
      profile_effect: member.profileEffect || 'none',
      gallery: member.gallery,
      bio: member.bio,
      join_date: member.joinDate,
      total_events: member.totalEvents || 0,
      total_km: member.totalKm || 0,
    }).eq('id', id).select('*').single();
    if (error) throwSupabaseError('Uye guncelleme hatasi', error);

    if (data) {
      const updatedMember = mapMember(data);
      setMembers((current) => current.map((item) => item.id === id ? updatedMember : item));
    } else {
      await loadMembers();
    }
  };

  const deleteMember = async (id: number) => {
    const { error } = await supabase.from('members').delete().eq('id', id);
    if (error) throwSupabaseError('Uye silme hatasi', error);
    setMembers((current) => current.filter((member) => member.id !== id));
  };

  // ---- EVENT FONKSİYONLARI ----
  const addSponsor = async (sponsor: Omit<Sponsor, 'id'>) => {
    const { data, error } = await supabase.from('sponsors').insert({
      name: sponsor.name,
      category: sponsor.category,
      description: sponsor.description,
      workmanship: sponsor.workmanship,
      discount_text: sponsor.discountText,
      phone: sponsor.phone,
      instagram: sponsor.instagram,
      website: sponsor.website,
      maps_url: sponsor.mapsUrl,
      address: sponsor.address,
      logo: sponsor.logo,
      cover_image: sponsor.coverImage,
      gallery: sponsor.gallery || [],
      videos: sponsor.videos || [],
      featured: sponsor.featured || false,
    }).select('*').single();
    if (error) throwSupabaseError('Sponsor ekleme hatasi', error);

    if (data) {
      const newSponsor = mapSponsor(data);
      setSponsors((current) => [newSponsor, ...current.filter((item) => item.id !== newSponsor.id)]);
    } else {
      await loadSponsors();
    }
  };

  const updateSponsor = async (id: number, sponsor: Omit<Sponsor, 'id'>) => {
    const { data, error } = await supabase.from('sponsors').update({
      name: sponsor.name,
      category: sponsor.category,
      description: sponsor.description,
      workmanship: sponsor.workmanship,
      discount_text: sponsor.discountText,
      phone: sponsor.phone,
      instagram: sponsor.instagram,
      website: sponsor.website,
      maps_url: sponsor.mapsUrl,
      address: sponsor.address,
      logo: sponsor.logo,
      cover_image: sponsor.coverImage,
      gallery: sponsor.gallery || [],
      videos: sponsor.videos || [],
      featured: sponsor.featured || false,
    }).eq('id', id).select('*').single();
    if (error) throwSupabaseError('Sponsor guncelleme hatasi', error);

    if (data) {
      const updatedSponsor = mapSponsor(data);
      setSponsors((current) => current.map((item) => item.id === id ? updatedSponsor : item));
    } else {
      await loadSponsors();
    }
  };

  const deleteSponsor = async (id: number) => {
    const { error } = await supabase.from('sponsors').delete().eq('id', id);
    if (error) throwSupabaseError('Sponsor silme hatasi', error);
    setSponsors((current) => current.filter((sponsor) => sponsor.id !== id));
  };

  const addNewsPost = async (post: Omit<NewsPost, 'id'>) => {
    const { data, error } = await supabase.from('news_posts').insert({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      gallery: post.gallery || [],
      videos: post.videos || [],
      featured: post.featured || false,
    }).select('*').single();
    if (error) throwSupabaseError('Haber ekleme hatasi', error);

    if (data) {
      const newPost = mapNewsPost(data);
      setNewsPosts((current) => [newPost, ...current.filter((item) => item.id !== newPost.id)]);
    } else {
      await loadNewsPosts();
    }
  };

  const updateNewsPost = async (id: number, post: Omit<NewsPost, 'id'>) => {
    const { data, error } = await supabase.from('news_posts').update({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      gallery: post.gallery || [],
      videos: post.videos || [],
      featured: post.featured || false,
    }).eq('id', id).select('*').single();
    if (error) throwSupabaseError('Haber guncelleme hatasi', error);

    if (data) {
      const updatedPost = mapNewsPost(data);
      setNewsPosts((current) => current.map((item) => item.id === id ? updatedPost : item));
    } else {
      await loadNewsPosts();
    }
  };

  const deleteNewsPost = async (id: number) => {
    const { error } = await supabase.from('news_posts').delete().eq('id', id);
    if (error) throwSupabaseError('Haber silme hatasi', error);
    setNewsPosts((current) => current.filter((post) => post.id !== id));
  };

  const addAnnouncement = async (announcement: Omit<Announcement, 'id'>) => {
    const { data, error } = await supabase.from('announcements').insert({
      text: announcement.text,
      link: announcement.link,
      is_active: announcement.isActive ?? true,
      priority: announcement.priority || 0,
    }).select('*').single();
    if (error) throwSupabaseError('Duyuru ekleme hatasi', error);

    if (data) {
      const newAnnouncement = mapAnnouncement(data);
      setAnnouncements((current) => [newAnnouncement, ...current.filter((item) => item.id !== newAnnouncement.id)]);
    } else {
      await loadAnnouncements();
    }
  };

  const updateAnnouncement = async (id: number, announcement: Omit<Announcement, 'id'>) => {
    const { data, error } = await supabase.from('announcements').update({
      text: announcement.text,
      link: announcement.link,
      is_active: announcement.isActive ?? true,
      priority: announcement.priority || 0,
    }).eq('id', id).select('*').single();
    if (error) throwSupabaseError('Duyuru guncelleme hatasi', error);

    if (data) {
      const updatedAnnouncement = mapAnnouncement(data);
      setAnnouncements((current) => current.map((item) => item.id === id ? updatedAnnouncement : item));
    } else {
      await loadAnnouncements();
    }
  };

  const deleteAnnouncement = async (id: number) => {
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) throwSupabaseError('Duyuru silme hatasi', error);
    setAnnouncements((current) => current.filter((announcement) => announcement.id !== id));
  };

  const addEvent = async (event: Omit<Event, 'id'>) => {
    const { error } = await supabase.from('events').insert({
      title: event.title,
      date: event.date,
      location: event.location,
      participants: event.participants || 0,
      distance: event.distance,
      status: event.status || 'upcoming',
      description: event.description,
      image: event.image,
      photos: event.photos || [],
      route: event.route || [],
      highlights: event.highlights || [],
      recommendations: event.recommendations || [],
      duration: event.duration,
    });
    if (error) { console.error('Etkinlik ekleme hatası:', error); return; }
    await loadEvents();
  };

  const updateEvent = async (id: number, event: Omit<Event, 'id'>) => {
    const { error } = await supabase.from('events').update({
      title: event.title,
      date: event.date,
      location: event.location,
      participants: event.participants || 0,
      distance: event.distance,
      status: event.status || 'upcoming',
      description: event.description,
      image: event.image,
      photos: event.photos || [],
      route: event.route || [],
      highlights: event.highlights || [],
      recommendations: event.recommendations || [],
      duration: event.duration,
    }).eq('id', id);
    if (error) { console.error('Etkinlik güncelleme hatası:', error); return; }
    await loadEvents();
  };

  const deleteEvent = async (id: number) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) { console.error('Etkinlik silme hatası:', error); return; }
    await loadEvents();
  };

  // ---- GALLERY FONKSİYONLARI ----
  const addGalleryImage = async (image: Omit<GalleryImage, 'id'>) => {
    const { error } = await supabase.from('gallery_images').insert({
      title: image.title,
      url: image.url,
      category: image.category || 'events',
    });
    if (error) { console.error('Galeri ekleme hatası:', error); return; }
    await loadGalleryImages();
  };

  const updateGalleryImage = async (id: number, image: Omit<GalleryImage, 'id'>) => {
    const { error } = await supabase.from('gallery_images').update({
      title: image.title,
      url: image.url,
      category: image.category,
    }).eq('id', id);
    if (error) { console.error('Galeri güncelleme hatası:', error); return; }
    await loadGalleryImages();
  };

  const deleteGalleryImage = async (id: number) => {
    const { error } = await supabase.from('gallery_images').delete().eq('id', id);
    if (error) { console.error('Galeri silme hatası:', error); return; }
    await loadGalleryImages();
  };

  // ---- MESSAGE FONKSİYONLARI ----
  const addMessage = async (message: Omit<Message, 'id'>) => {
    const { error } = await supabase.from('messages').insert({
      name: message.name,
      email: message.email,
      phone: message.phone,
      message: message.message,
      status: 'unread',
    });
    if (error) { console.error('Mesaj ekleme hatası:', error); return; }
    await loadMessages();
  };

  const deleteMessage = async (id: number) => {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) { console.error('Mesaj silme hatası:', error); return; }
    await loadMessages();
  };

  const markMessageAsRead = async (id: number) => {
    const { error } = await supabase.from('messages').update({ status: 'read' }).eq('id', id);
    if (error) { console.error('Mesaj güncelleme hatası:', error); return; }
    await loadMessages();
  };

  // ---- SETTINGS FONKSİYONLARI ----
  const updateAboutContent = async (content: AboutContent) => {
    const { data } = await supabase.from('site_settings').select('id').limit(1).single();
    if (data) {
      await supabase.from('site_settings').update({
        about_description: content.description,
        about_mission: content.mission,
        total_members: content.totalMembers,
        annual_events: content.annualEvents,
        total_km: content.totalKm,
      }).eq('id', data.id);
    } else {
      await supabase.from('site_settings').insert({
        about_description: content.description,
        about_mission: content.mission,
        total_members: content.totalMembers,
        annual_events: content.annualEvents,
        total_km: content.totalKm,
      });
    }
    setAboutContent(content);
  };

  const updateSiteSettings = async (settings: SiteSettings) => {
    const { data } = await supabase.from('site_settings').select('id').limit(1).single();
    if (data) {
      await supabase.from('site_settings').update({
        site_name: settings.siteName,
        site_tagline: settings.siteTagline,
        contact_email: settings.contactEmail,
        instagram: settings.instagram,
        phone: settings.phone,
      }).eq('id', data.id);
    } else {
      await supabase.from('site_settings').insert({
        site_name: settings.siteName,
        site_tagline: settings.siteTagline,
        contact_email: settings.contactEmail,
        instagram: settings.instagram,
        phone: settings.phone,
      });
    }
    setSiteSettings(settings);
  };

  return (
    <DataContext.Provider
      value={{
        events,
        galleryImages,
        messages,
        members,
        sponsors,
        newsPosts,
        announcements,
        aboutContent,
        siteSettings,
        loading,
        addEvent,
        updateEvent,
        deleteEvent,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        addMessage,
        deleteMessage,
        markMessageAsRead,
        addMember,
        updateMember,
        deleteMember,
        addSponsor,
        updateSponsor,
        deleteSponsor,
        addNewsPost,
        updateNewsPost,
        deleteNewsPost,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        updateAboutContent,
        updateSiteSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
