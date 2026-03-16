--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attributes" (
    id uuid NOT NULL,
    "productId" uuid NOT NULL,
    "nameEach" character varying(255),
    size character varying(255),
    price double precision,
    "imageUrl" character varying(255),
    "publicId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Attributes" OWNER TO postgres;

--
-- Name: Details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Details" (
    id uuid NOT NULL,
    "productId" uuid NOT NULL,
    material character varying(255),
    origin character varying(255),
    "shipFrom" character varying(255),
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Details" OWNER TO postgres;

--
-- Name: Follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Follows" (
    id uuid NOT NULL,
    follower character varying(255) NOT NULL,
    following character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Follows" OWNER TO postgres;

--
-- Name: ImageProducts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ImageProducts" (
    id uuid NOT NULL,
    "productId" uuid NOT NULL,
    "imageUrl" character varying(255),
    "publicId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ImageProducts" OWNER TO postgres;

--
-- Name: Image_Ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Image_Ratings" (
    id uuid NOT NULL,
    "ratingId" uuid NOT NULL,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Image_Ratings" OWNER TO postgres;

--
-- Name: Likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Likes" (
    id uuid NOT NULL,
    "productId" uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Likes" OWNER TO postgres;

--
-- Name: Products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Products" (
    id uuid NOT NULL,
    name character varying(255),
    favorite boolean,
    discount double precision,
    "attributeName" character varying(255),
    "fromStore" character varying(255),
    category character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Products" OWNER TO postgres;

--
-- Name: Ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ratings" (
    id uuid NOT NULL,
    "dataUserId" character varying(255) NOT NULL,
    "productId" uuid NOT NULL,
    "attributeId" uuid NOT NULL,
    rate integer NOT NULL,
    comment text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Ratings" OWNER TO postgres;

--
-- Name: Orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orders" (
    id uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    "totalPrice" double precision NOT NULL,
    status character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Orders" OWNER TO postgres;

--
-- Name: OrderItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItems" (
    id uuid NOT NULL,
    "orderId" uuid NOT NULL,
    "attributeId" uuid NOT NULL,
    "fromStore" character varying(255) NOT NULL,
    quantity integer NOT NULL,
    "purchasePrice" double precision NOT NULL,
    status character varying(255) DEFAULT 'PENDING'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."OrderItems" OWNER TO postgres;

--
-- Name: Solds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Solds" (
    id uuid NOT NULL,
    "productId" uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    "quantity" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Solds" OWNER TO postgres;

--
-- Name: Stocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Stocks" (
    id uuid NOT NULL,
    "productId" uuid NOT NULL,
    "attributeID" uuid NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Stocks" OWNER TO postgres;

--
-- Name: Video_Ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Video_Ratings" (
    id uuid NOT NULL,
    "ratingId" uuid NOT NULL,
    "videoUrl" character varying(255),
    "thumbnailUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Video_Ratings" OWNER TO postgres;

--
-- Data for Name: Attributes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Attributes" (id, "productId", "nameEach", size, price, "imageUrl", "createdAt", "updatedAt") FROM stdin;
1b60c470-cef4-4614-b73b-5f199e65e047	91481205-3905-4d41-b456-1db4aafb6d8b	Đen - Topography	80x30cm	65000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-27 16:30:09.847017+07	2025-07-27 16:30:09.847017+07
e7a5602a-6f97-4839-9f60-591c32f0e750	91481205-3905-4d41-b456-1db4aafb6d8b	Đen - Topography	90x40cm	80000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-27 16:30:09.847017+07	2025-07-27 16:30:09.847017+07
e88f44a7-abbc-45de-be98-bc9bc5388200	91481205-3905-4d41-b456-1db4aafb6d8b	Đen - Topography	100x50cm	160000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-27 16:30:09.847017+07	2025-07-27 16:30:09.847017+07
7ccd1c47-cc99-4eb8-8a28-f5f250b66cf3	91481205-3905-4d41-b456-1db4aafb6d8b	Đen - Topography	40x45cm	35000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-27 16:30:09.847017+07	2025-07-27 16:30:09.847017+07
c9c82391-a525-4ffc-84f2-b1300eea3c0e	91481205-3905-4d41-b456-1db4aafb6d8b	Trắng - Topography	40x45cm	35000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0boxpk7a@resize_w900_nl.webp	2025-07-27 16:30:09.847017+07	2025-07-27 16:30:09.847017+07
fb694f9f-1b8a-49c2-baf9-77e0de740d8f	91481205-3905-4d41-b456-1db4aafb6d8b	Trắng - Topography	90x40cm	80000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0boxpk7a@resize_w900_nl.webp	2025-07-27 16:30:09.847017+07	2025-07-27 16:30:09.847017+07
86db0f61-f2f6-471d-a007-06a44ed51cb9	91481205-3905-4d41-b456-1db4aafb6d8b	Đen - Topography	60x35cm	65000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-28 21:45:13.553484+07	2025-07-28 21:45:13.553484+07
63d14c4e-ed6c-4bae-9d4d-8dda2bf86370	91481205-3905-4d41-b456-1db4aafb6d8b	Đen - Topography	60x30cm	65000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-28 21:45:13.553484+07	2025-07-28 21:45:13.553484+07
2b0059ea-dd99-4402-a1aa-1a4b8e6eb68a	91481205-3905-4d41-b456-1db4aafb6d8b	Đen - Topography	70x30cm	65000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-28 21:45:13.553484+07	2025-07-28 21:45:13.553484+07
2bf2600e-a515-4778-95cd-02526f875680	91481205-3905-4d41-b456-1db4aafb6d8b	Đen - Topography	70x140cm	250000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-28 21:45:13.553484+07	2025-07-28 21:45:13.553484+07
599ec329-c459-4960-85c6-731ee4a34975	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	Đen		2099000	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtqus65132x5c@resize_w900_nl.webp	2025-09-20 11:10:01.989266+07	2025-09-20 11:10:01.989266+07
9969b818-41a4-4753-b31f-53e0bb0a571b	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	Black Pink Gra Pro		2469000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mb3mp90xsrfc8f@resize_w900_nl.webp	2025-09-20 11:10:01.989266+07	2025-09-20 11:10:01.989266+07
09da0bb9-8181-44ad-8f6e-6d5c5ab818ef	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	Ghi xanh		1377000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-09-20 11:10:01.989266+07	2025-09-20 11:10:01.989266+07
dd5b2a6b-3bdf-49b6-8184-5680c457c6e2	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	Trắng đen hồng		1377000	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m0xxu592o4dre4@resize_w900_nl.webp	2025-09-20 11:10:01.989266+07	2025-09-20 11:10:01.989266+07
5f91fc3f-ed1a-444f-861d-5d06a2e02984	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	Túi 50gr		25000		2025-09-20 17:25:45.8699+07	2025-09-20 17:25:45.8699+07
f42679e8-b6a9-40ab-b786-fdb19306fc97	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	Hủ 100gr		40000		2025-09-20 17:25:45.8699+07	2025-09-20 17:25:45.8699+07
be9c6977-0b76-4f5b-a350-924b0a4ac855	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	Túi 250gr kèm sốt tắc		130000		2025-09-20 17:25:45.8699+07	2025-09-20 17:25:45.8699+07
e6d3c86b-1dc6-4463-bc25-a1ea8fd088f4	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	Túi 250gr kèm ớt rim		250000		2025-09-20 17:25:45.8699+07	2025-09-20 17:25:45.8699+07
\.


--
-- Data for Name: Details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Details" (id, "productId", material, origin, "shipFrom", description, "createdAt", "updatedAt") FROM stdin;
b91e8115-3eaf-4fa6-96b6-f1074d896ecc	91481205-3905-4d41-b456-1db4aafb6d8b	Vải cao cấp	Việt Nam	Hà Nội	Đây là sản phẩm mẫu	2025-07-27 16:30:21.706232+07	2025-07-27 16:30:21.706232+07
fec28fb3-39c9-4679-a307-357ef24afdac	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	Nhựa	Việt Nam	Hồ Chí Minh	Đây là sản phẩm mẫu	2025-09-20 11:10:10.339976+07	2025-09-20 11:10:10.339976+07
d72026ad-c542-423d-bb9d-06dcf94b2b19	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	Bánh tráng	Việt Nam	Hồ Chí Minh	Đây là sản phẩm mẫu	2025-09-20 17:25:52.07748+07	2025-09-20 17:25:52.07748+07
\.


--
-- Data for Name: Follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Follows" (id, follower, following, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ImageProducts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ImageProducts" (id, "productId", "imageUrl", "createdAt", "updatedAt") FROM stdin;
d8f177b9-44fb-4325-8bf6-3efab52fa00f	91481205-3905-4d41-b456-1db4aafb6d8b	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eow14d1pdo7f@resize_w900_nl.webp	2025-07-27 16:29:42.039787+07	2025-07-27 16:29:42.039787+07
fe44c23d-2259-408f-a068-f859bdede565	91481205-3905-4d41-b456-1db4aafb6d8b	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eowfv5gyik27@resize_w900_nl.webp	2025-07-27 16:29:42.039787+07	2025-07-27 16:29:42.039787+07
7eccbce3-ff33-4e79-996d-b0ed93bc1e59	91481205-3905-4d41-b456-1db4aafb6d8b	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eowfv5gy0126@resize_w900_nl.webp	2025-07-27 16:29:42.039787+07	2025-07-27 16:29:42.039787+07
62fcc22f-4c5f-4526-a11b-839090f5da25	91481205-3905-4d41-b456-1db4aafb6d8b	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eowl11wwxo47@resize_w900_nl.webp	2025-07-27 16:29:42.039787+07	2025-07-27 16:29:42.039787+07
372f0ec9-3dee-4e8d-9dcb-f2c95fd37c9e	91481205-3905-4d41-b456-1db4aafb6d8b	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eowl11wwf576@resize_w900_nl.webp	2025-07-27 16:29:42.039787+07	2025-07-27 16:29:42.039787+07
b693935e-5616-4bb6-b075-e7ec8fff0610	91481205-3905-4d41-b456-1db4aafb6d8b	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0boxpk7a@resize_w900_nl.webp	2025-07-27 16:29:42.039787+07	2025-07-27 16:29:42.039787+07
da437877-f3a6-42f5-93fe-f7a2d968a554	91481205-3905-4d41-b456-1db4aafb6d8b	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp	2025-07-27 16:29:42.039787+07	2025-07-27 16:29:42.039787+07
b7c86b88-660e-4e53-8435-328581f1ea77	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtl0sb8fpi1c3@resize_w900_nl.webp	2025-09-20 11:09:49.946886+07	2025-09-20 11:09:49.946886+07
799354f6-80a2-41d8-a189-d1a46f892139	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtjs66ypuqj37@resize_w900_nl.webp	2025-09-20 11:09:49.946886+07	2025-09-20 11:09:49.946886+07
660e13d5-2eb8-4491-8712-f10e66aa5ecd	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtl0sb8eaxl0a@resize_w900_nl.webp	2025-09-20 11:09:49.946886+07	2025-09-20 11:09:49.946886+07
74acac77-6459-41a8-b12c-3df0f726ca3a	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtl0sb8iimx06@resize_w900_nl.webp	2025-09-20 11:09:49.946886+07	2025-09-20 11:09:49.946886+07
48f7ee11-1205-4834-bb6e-9715079827f5	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtl0sb7yuop1d@resize_w900_nl.webp	2025-09-20 11:09:49.946886+07	2025-09-20 11:09:49.946886+07
c2384778-403d-4a0a-9feb-3058fb03f204	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0boxpk7a@resize_w900_nl.webp	2025-09-20 11:09:49.946886+07	2025-09-20 11:09:49.946886+07
01b6bb56-0f25-465a-a73d-932ac64694fa	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0b2ps5s7ap96e@resize_w900_nl.webp	2025-09-20 11:09:49.946886+07	2025-09-20 11:09:49.946886+07
d3d257f6-b5f2-4e1e-b270-d9e196b5dde3	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m01nzll7qtn36a@resize_w900_nl.webp	2025-09-20 17:25:37.546764+07	2025-09-20 17:25:37.546764+07
951bb2ca-4111-46f9-bd1e-8670e0d50a6f	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m01nzll7qtbhf0@resize_w900_nl.webp	2025-09-20 17:25:37.546764+07	2025-09-20 17:25:37.546764+07
ccd2532a-4e67-4ae5-93d5-8c04232c1c32	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m01nzll869kde5@resize_w900_nl.webp	2025-09-20 17:25:37.546764+07	2025-09-20 17:25:37.546764+07
83f075d0-3fe4-429c-a3a5-a3d9abeafa26	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m01nzll8lq4v33@resize_w900_nl.webp	2025-09-20 17:25:37.546764+07	2025-09-20 17:25:37.546764+07
f354df13-a05a-4cbe-a307-7c415eb20cff	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lic17bq70pos67@resize_w900_nl.webp	2025-09-20 17:25:37.546764+07	2025-09-20 17:25:37.546764+07
\.


--
-- Data for Name: Image_Ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Image_Ratings" (id, "ratingId", "imageUrl", "createdAt", "updatedAt") FROM stdin;
03760f6d-c71e-4bec-8876-a7ca8644fb64	06fdb7bb-9e19-44c3-bf08-50d48ebaa046	/images/image_1.webp	2025-09-26 03:11:52.059885+07	2025-09-26 03:11:52.059885+07
\.


--
-- Data for Name: Likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Likes" (id, "productId", "userId", "createdAt", "updatedAt") FROM stdin;
88674fc1-f70e-42b3-b07a-100f6a7eb24e	91481205-3905-4d41-b456-1db4aafb6d8b	6879b7ac16685109bbc057b7	2025-09-21 00:28:37.941+07	2025-09-21 00:28:37.941+07
aad97a4b-f213-4730-858d-e0004378f5bf	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	6879b7ac16685109bbc057b7	2025-09-21 00:29:56.771+07	2025-09-21 00:29:56.771+07
8b3a4e2e-28a6-466a-b985-6456234e7b0a	91481205-3905-4d41-b456-1db4aafb6d8b	68d59d4c60cd15ba00641158	2025-09-26 02:58:18.327+07	2025-09-26 02:58:18.327+07
853628a6-84a2-4eaa-b03b-05c587be4234	91481205-3905-4d41-b456-1db4aafb6d8b	116227481359362644879	2026-02-27 08:54:33.104+07	2026-02-27 08:54:33.104+07
\.


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Products" (id, name, favorite, discount, "attributeName", "fromStore", category, "createdAt", "updatedAt") FROM stdin;
91481205-3905-4d41-b456-1db4aafb6d8b	Lót chuột cỡ lớn họa tiết Typography tối giản đa dạng kích thước, pad chuột gaming chống trơn trượt	t	10	Màu sắc	Kho tổng	Máy Tính & Laptop	2025-07-27 16:22:07.052384+07	2025-07-27 16:22:07.052384+07
f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	Bàn phím cơ gaming không dây LANGTU LT104 pro, bàn phím bluetooth 3mode hotswap keycap xuyên led RGB	f	28	Màu sắc	Langtu Store	Máy Tính & Laptop	2025-09-20 11:01:09.616742+07	2025-09-20 11:01:09.616742+07
cf2d4ee1-0c03-41f2-bc31-acc235d32b00	(CHUCHAN) Tóp mỡ da giòn rim nước mắm, nhà làm chuẩn vị	f	5	Đóng gói	CHUCHAN Shop	Bách Hóa Online	2025-09-20 17:21:11.250451+07	2025-09-20 17:21:11.250451+07
\.


--
-- Data for Name: Ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ratings" (id, "dataUserId", "productId", "attributeId", rate, comment, "createdAt", "updatedAt") FROM stdin;
3403fd43-0768-49e5-9e78-1779e2f5bdde	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:42.210225+07	2025-09-26 03:09:42.210225+07
3a9a94bc-123d-4748-ae5a-03c19dfbf8eb	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:42.753829+07	2025-09-26 03:09:42.753829+07
4cb20a5e-4bf2-4e0b-85e2-cfb817f5fe55	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:42.93052+07	2025-09-26 03:09:42.93052+07
06fdb7bb-9e19-44c3-bf08-50d48ebaa046	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:43.120668+07	2025-09-26 03:09:43.120668+07
875826dd-7b25-4778-877d-ad6863cb6a7d	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:43.292985+07	2025-09-26 03:09:43.292985+07
fc6fb6ec-eca4-4b52-b467-457dbb48f06c	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:43.467717+07	2025-09-26 03:09:43.467717+07
16a4f77f-4ef0-4f63-943c-a8aefbe6fd00	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:43.645403+07	2025-09-26 03:09:43.645403+07
1a73fa7d-3b5d-421a-a07e-d43e0f2cbc0c	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:43.829521+07	2025-09-26 03:09:43.829521+07
2a400a09-e597-416a-8eac-df3f376c19c4	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:44.018852+07	2025-09-26 03:09:44.018852+07
c9bff435-40f2-4c21-b5a1-964c715bda64	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:44.252568+07	2025-09-26 03:09:44.252568+07
e2c25cd6-58c0-4897-aa8d-1739cca01d54	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:44.566732+07	2025-09-26 03:09:44.566732+07
d1de26a6-32a0-4a80-abb8-415c9f4ce39b	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:44.749688+07	2025-09-26 03:09:44.749688+07
98cb87ce-009c-4c17-b082-8a1dfa757a6e	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:44.944621+07	2025-09-26 03:09:44.944621+07
e828bfc2-e796-4b6a-870d-a02ee71058f8	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:45.122519+07	2025-09-26 03:09:45.122519+07
39770794-e738-4f51-8c4e-cd939929f971	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:45.327833+07	2025-09-26 03:09:45.327833+07
52caa159-4cb2-4dee-a651-a5ff2289a302	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:45.514521+07	2025-09-26 03:09:45.514521+07
ec5353f6-2309-4202-8c49-0cd4e361f361	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	5	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:45.692617+07	2025-09-26 03:09:45.692617+07
7286ff04-0407-4bd7-90e2-8649e7c3fc5f	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	4	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:50.218355+07	2025-09-26 03:09:50.218355+07
98ccedb2-a2db-4568-9212-e96e42c3bf02	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	4	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:50.403121+07	2025-09-26 03:09:50.403121+07
86539f22-5007-4fca-85db-9d1ebf1f8b28	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	4	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:50.589493+07	2025-09-26 03:09:50.589493+07
ac596245-87ad-4f50-b26a-70d195b2e409	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	4	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:50.769145+07	2025-09-26 03:09:50.769145+07
2935b0fe-2b24-4ae2-b75b-7b87ddfd2efb	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	4	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:50.936149+07	2025-09-26 03:09:50.936149+07
92a19c95-68d5-45eb-813b-87eb0e567fd1	68d59d4c60cd15ba0064115a	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	4	Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà	2025-09-26 03:09:51.123386+07	2025-09-26 03:09:51.123386+07
\.


--
-- Data for Name: Solds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Solds" (id, "productId", "userId", quantity, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Stocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Stocks" (id, "productId", "attributeID", "quantity", "createdAt", "updatedAt") FROM stdin;
3a3570ea-950d-466c-98b1-281d31ff9cd3	91481205-3905-4d41-b456-1db4aafb6d8b	1b60c470-cef4-4614-b73b-5f199e65e047	1	2025-07-27 16:31:00.846201+07	2025-07-27 16:31:00.846201+07
16910f58-bf75-45bf-a0bd-e06251d8c8b8	91481205-3905-4d41-b456-1db4aafb6d8b	e7a5602a-6f97-4839-9f60-591c32f0e750	3	2025-07-27 16:31:18.718518+07	2025-07-27 16:31:18.718518+07
709b6719-a686-41ee-a5a9-14d34e7db096	91481205-3905-4d41-b456-1db4aafb6d8b	e88f44a7-abbc-45de-be98-bc9bc5388200	5	2025-07-27 16:31:33.102699+07	2025-07-27 16:31:33.102699+07
c9d272a5-aace-4a6f-ae23-93206e289cb0	91481205-3905-4d41-b456-1db4aafb6d8b	7ccd1c47-cc99-4eb8-8a28-f5f250b66cf3	5	2025-07-27 16:31:46.931143+07	2025-07-27 16:31:46.931143+07
173ed374-0de7-4788-b0d8-ce1be7031e5a	91481205-3905-4d41-b456-1db4aafb6d8b	c9c82391-a525-4ffc-84f2-b1300eea3c0e	4	2025-07-27 16:32:03.04855+07	2025-07-27 16:32:03.04855+07
339ebe5d-6a4b-4e77-b3b0-3443097f9418	91481205-3905-4d41-b456-1db4aafb6d8b	fb694f9f-1b8a-49c2-baf9-77e0de740d8f	4	2025-07-27 16:32:15.064727+07	2025-07-27 16:32:15.064727+07
59e56295-2f89-4112-af8f-d1a554d9f869	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	599ec329-c459-4960-85c6-731ee4a34975	3	2025-09-20 11:10:46.303162+07	2025-09-20 11:10:46.303162+07
3e5a7b4c-c4e9-4cef-9140-4e1c21c7e831	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	9969b818-41a4-4753-b31f-53e0bb0a571b	3	2025-09-20 11:11:08.161292+07	2025-09-20 11:11:08.161292+07
f23db489-00f1-4e40-bf79-cfc7c1931e02	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	09da0bb9-8181-44ad-8f6e-6d5c5ab818ef	3	2025-09-20 11:11:25.635682+07	2025-09-20 11:11:25.635682+07
d1e2929f-bcd4-477e-9c82-e8c03cc54738	f487c7a1-8de5-4ec7-9ea5-378e89aa0b33	dd5b2a6b-3bdf-49b6-8184-5680c457c6e2	2	2025-09-20 11:11:34.343212+07	2025-09-20 11:11:34.343212+07
49da3461-d594-49cd-8bc1-ab8581f4351e	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	5f91fc3f-ed1a-444f-861d-5d06a2e02984	5	2025-09-20 17:25:59.885481+07	2025-09-20 17:25:59.885481+07
f6c9b838-6523-474e-b4c8-042d2aeeb419	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	f42679e8-b6a9-40ab-b786-fdb19306fc97	3	2025-09-20 17:26:10.581289+07	2025-09-20 17:26:10.581289+07
c5304a06-4ed1-4afa-82d2-91af41cbd694	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	e6d3c86b-1dc6-4463-bc25-a1ea8fd088f4	7	2025-09-20 17:26:20.137373+07	2025-09-20 17:26:20.137373+07
1daffee4-c5cf-4fe7-8eec-33e17a474981	cf2d4ee1-0c03-41f2-bc31-acc235d32b00	be9c6977-0b76-4f5b-a350-924b0a4ac855	5	2025-09-20 17:26:31.744055+07	2025-09-20 17:26:31.744055+07
\.

--
-- Data for Name: Video_Ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Video_Ratings" (id, "ratingId", "videoUrl", "thumbnailUrl", "createdAt", "updatedAt") FROM stdin;
e2d9d778-34e8-4fb2-8d0a-bb566f0ca284	06fdb7bb-9e19-44c3-bf08-50d48ebaa046	/videos/video_1.m3u8	/images/video_1.jpg	2025-09-26 03:11:52.059885+07	2025-09-26 03:11:52.059885+07
d885e07d-cb34-44f0-a42b-14f6a3d436ef	06fdb7bb-9e19-44c3-bf08-50d48ebaa046	/videos/Floating.m3u8	/images/Floating.jpg	2025-09-26 03:11:52.059885+07	2025-09-26 03:11:52.059885+07
\.


--
-- Name: Attributes Attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attributes"
    ADD CONSTRAINT "Attributes_pkey" PRIMARY KEY (id);


--
-- Name: Details Details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Details"
    ADD CONSTRAINT "Details_pkey" PRIMARY KEY (id);


--
-- Name: Follows Follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_pkey" PRIMARY KEY (id);


--
-- Name: ImageProducts ImageProducts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ImageProducts"
    ADD CONSTRAINT "ImageProducts_pkey" PRIMARY KEY (id);


--
-- Name: Image_Ratings Image_Ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image_Ratings"
    ADD CONSTRAINT "Image_Ratings_pkey" PRIMARY KEY (id);


--
-- Name: Likes Likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY (id);


--
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);


--
-- Name: Ratings Ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ratings"
    ADD CONSTRAINT "Ratings_pkey" PRIMARY KEY (id);


--
-- Name: Solds Solds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Solds"
    ADD CONSTRAINT "Solds_pkey" PRIMARY KEY (id);


--
-- Name: Stocks Stocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stocks"
    ADD CONSTRAINT "Stocks_pkey" PRIMARY KEY (id);


--
-- Name: Video_Ratings Video_Ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Video_Ratings"
    ADD CONSTRAINT "Video_Ratings_pkey" PRIMARY KEY (id);


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- Name: OrderItems OrderItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItems"
    ADD CONSTRAINT "OrderItems_pkey" PRIMARY KEY (id);


--
-- Name: Attributes Attributes_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attributes"
    ADD CONSTRAINT "Attributes_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Details Details_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Details"
    ADD CONSTRAINT "Details_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ImageProducts ImageProducts_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ImageProducts"
    ADD CONSTRAINT "ImageProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Image_Ratings Image_Ratings_ratingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image_Ratings"
    ADD CONSTRAINT "Image_Ratings_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES public."Ratings"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Likes Likes_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Ratings Ratings_attributeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ratings"
    ADD CONSTRAINT "Ratings_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES public."Attributes"(id) ON UPDATE CASCADE;


--
-- Name: Ratings Ratings_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ratings"
    ADD CONSTRAINT "Ratings_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Solds Solds_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Solds"
    ADD CONSTRAINT "Solds_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Stocks Stocks_attributeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stocks"
    ADD CONSTRAINT "Stocks_attributeID_fkey" FOREIGN KEY ("attributeID") REFERENCES public."Attributes"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Stocks Stocks_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stocks"
    ADD CONSTRAINT "Stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Video_Ratings Video_Ratings_ratingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Video_Ratings"
    ADD CONSTRAINT "Video_Ratings_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES public."Ratings"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItems OrderItems_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItems"
    ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Orders"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItems OrderItems_attributeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItems"
    ADD CONSTRAINT "OrderItems_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES public."Attributes"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

