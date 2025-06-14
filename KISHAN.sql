PGDMP  -                    }            quizii    17.4    17.4 6    [           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            \           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            ]           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            ^           1262    16416    quizii    DATABASE     l   CREATE DATABASE quizii WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE quizii;
                     postgres    false            �            1259    16507    admin    TABLE     �   CREATE TABLE public.admin (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    pass text NOT NULL,
    "date-time_on_login" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.admin;
       public         heap r       postgres    false            �            1259    16506    admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public               postgres    false    226            _           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public               postgres    false    225            �            1259    16428    category    TABLE     �   CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now(),
    type text NOT NULL,
    path text NOT NULL
);
    DROP TABLE public.category;
       public         heap r       postgres    false            �            1259    16427    category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public               postgres    false    220            `           0    0    category_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;
          public               postgres    false    219            �            1259    16461    questionTbl    TABLE     ,  CREATE TABLE public."questionTbl" (
    id integer NOT NULL,
    cid integer NOT NULL,
    question text NOT NULL,
    op1 text NOT NULL,
    op2 text NOT NULL,
    op3 text NOT NULL,
    op4 text NOT NULL,
    "date-time" timestamp without time zone DEFAULT now() NOT NULL,
    ans text NOT NULL
);
 !   DROP TABLE public."questionTbl";
       public         heap r       postgres    false            �            1259    16460    questionTbl_id_seq    SEQUENCE     �   CREATE SEQUENCE public."questionTbl_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."questionTbl_id_seq";
       public               postgres    false    222            a           0    0    questionTbl_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."questionTbl_id_seq" OWNED BY public."questionTbl".id;
          public               postgres    false    221            �            1259    16490    result_base_on_question    TABLE     �   CREATE TABLE public.result_base_on_question (
    id integer NOT NULL,
    cid integer NOT NULL,
    uid integer NOT NULL,
    date_time timestamp with time zone DEFAULT now() NOT NULL,
    opetion text NOT NULL,
    ans boolean NOT NULL
);
 +   DROP TABLE public.result_base_on_question;
       public         heap r       postgres    false            �            1259    16489    resultTbl_id_seq    SEQUENCE     �   CREATE SEQUENCE public."resultTbl_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."resultTbl_id_seq";
       public               postgres    false    224            b           0    0    resultTbl_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."resultTbl_id_seq" OWNED BY public.result_base_on_question.id;
          public               postgres    false    223            �            1259    16540    result_base_on_category    TABLE     H  CREATE TABLE public.result_base_on_category (
    id integer NOT NULL,
    uid integer NOT NULL,
    cid integer NOT NULL,
    total_que integer NOT NULL,
    correct_que integer NOT NULL,
    wrong_que integer NOT NULL,
    percentage double precision NOT NULL,
    data_time timestamp with time zone DEFAULT now() NOT NULL
);
 +   DROP TABLE public.result_base_on_category;
       public         heap r       postgres    false            �            1259    16539    result_base_on_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.result_base_on_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.result_base_on_category_id_seq;
       public               postgres    false    228            c           0    0    result_base_on_category_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.result_base_on_category_id_seq OWNED BY public.result_base_on_category.id;
          public               postgres    false    227            �            1259    16418    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    pass text NOT NULL,
    date_time timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."user";
       public         heap r       postgres    false            �            1259    16417    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public               postgres    false    218            d           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public               postgres    false    217            �           2604    16510    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            �           2604    16431    category id    DEFAULT     j   ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 :   ALTER TABLE public.category ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    16464    questionTbl id    DEFAULT     t   ALTER TABLE ONLY public."questionTbl" ALTER COLUMN id SET DEFAULT nextval('public."questionTbl_id_seq"'::regclass);
 ?   ALTER TABLE public."questionTbl" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16543    result_base_on_category id    DEFAULT     �   ALTER TABLE ONLY public.result_base_on_category ALTER COLUMN id SET DEFAULT nextval('public.result_base_on_category_id_seq'::regclass);
 I   ALTER TABLE public.result_base_on_category ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    227    228            �           2604    16493    result_base_on_question id    DEFAULT     |   ALTER TABLE ONLY public.result_base_on_question ALTER COLUMN id SET DEFAULT nextval('public."resultTbl_id_seq"'::regclass);
 I   ALTER TABLE public.result_base_on_question ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    224    224            �           2604    16421    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            V          0    16507    admin 
   TABLE DATA           L   COPY public.admin (id, name, email, pass, "date-time_on_login") FROM stdin;
    public               postgres    false    226   �?       P          0    16428    category 
   TABLE DATA           E   COPY public.category (id, name, "timestamp", type, path) FROM stdin;
    public               postgres    false    220   +@       R          0    16461    questionTbl 
   TABLE DATA           `   COPY public."questionTbl" (id, cid, question, op1, op2, op3, op4, "date-time", ans) FROM stdin;
    public               postgres    false    222   >A       X          0    16540    result_base_on_category 
   TABLE DATA           y   COPY public.result_base_on_category (id, uid, cid, total_que, correct_que, wrong_que, percentage, data_time) FROM stdin;
    public               postgres    false    228   H       T          0    16490    result_base_on_question 
   TABLE DATA           X   COPY public.result_base_on_question (id, cid, uid, date_time, opetion, ans) FROM stdin;
    public               postgres    false    224   �H       N          0    16418    user 
   TABLE DATA           F   COPY public."user" (id, username, email, pass, date_time) FROM stdin;
    public               postgres    false    218   K       e           0    0    admin_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.admin_id_seq', 1, true);
          public               postgres    false    225            f           0    0    category_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.category_id_seq', 8, true);
          public               postgres    false    219            g           0    0    questionTbl_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."questionTbl_id_seq"', 28, true);
          public               postgres    false    221            h           0    0    resultTbl_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."resultTbl_id_seq"', 33, true);
          public               postgres    false    223            i           0    0    result_base_on_category_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.result_base_on_category_id_seq', 13, true);
          public               postgres    false    227            j           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 6, true);
          public               postgres    false    217            �           2606    16515    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public                 postgres    false    226            �           2606    16436    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public                 postgres    false    220            �           2606    16534 
   user email 
   CONSTRAINT     H   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email UNIQUE (email);
 6   ALTER TABLE ONLY public."user" DROP CONSTRAINT email;
       public                 postgres    false    218            �           2606    16470    questionTbl question 
   CONSTRAINT     U   ALTER TABLE ONLY public."questionTbl"
    ADD CONSTRAINT question UNIQUE (question);
 @   ALTER TABLE ONLY public."questionTbl" DROP CONSTRAINT question;
       public                 postgres    false    222            �           2606    16468    questionTbl questionTbl_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."questionTbl"
    ADD CONSTRAINT "questionTbl_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."questionTbl" DROP CONSTRAINT "questionTbl_pkey";
       public                 postgres    false    222            �           2606    16495 &   result_base_on_question resultTbl_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.result_base_on_question
    ADD CONSTRAINT "resultTbl_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.result_base_on_question DROP CONSTRAINT "resultTbl_pkey";
       public                 postgres    false    224            �           2606    16546 4   result_base_on_category result_base_on_category_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.result_base_on_category
    ADD CONSTRAINT result_base_on_category_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.result_base_on_category DROP CONSTRAINT result_base_on_category_pkey;
       public                 postgres    false    228            �           2606    16426    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public                 postgres    false    218            �           2606    16532    user username 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT username UNIQUE (username);
 9   ALTER TABLE ONLY public."user" DROP CONSTRAINT username;
       public                 postgres    false    218            �           2606    16586    questionTbl category    FK CONSTRAINT     ~   ALTER TABLE ONLY public."questionTbl"
    ADD CONSTRAINT category FOREIGN KEY (cid) REFERENCES public.category(id) NOT VALID;
 @   ALTER TABLE ONLY public."questionTbl" DROP CONSTRAINT category;
       public               postgres    false    220    4780    222            �           2606    16596     result_base_on_question category    FK CONSTRAINT     �   ALTER TABLE ONLY public.result_base_on_question
    ADD CONSTRAINT category FOREIGN KEY (cid) REFERENCES public.category(id) NOT VALID;
 J   ALTER TABLE ONLY public.result_base_on_question DROP CONSTRAINT category;
       public               postgres    false    4780    220    224            �           2606    16591 !   result_base_on_category cateogoru    FK CONSTRAINT     �   ALTER TABLE ONLY public.result_base_on_category
    ADD CONSTRAINT cateogoru FOREIGN KEY (cid) REFERENCES public.category(id) NOT VALID;
 K   ALTER TABLE ONLY public.result_base_on_category DROP CONSTRAINT cateogoru;
       public               postgres    false    228    4780    220            �           2606    16601    result_base_on_category userID    FK CONSTRAINT     �   ALTER TABLE ONLY public.result_base_on_category
    ADD CONSTRAINT "userID" FOREIGN KEY (uid) REFERENCES public."user"(id) NOT VALID;
 J   ALTER TABLE ONLY public.result_base_on_category DROP CONSTRAINT "userID";
       public               postgres    false    228    218    4776            �           2606    16606    result_base_on_question userID    FK CONSTRAINT     �   ALTER TABLE ONLY public.result_base_on_question
    ADD CONSTRAINT "userID" FOREIGN KEY (uid) REFERENCES public."user"(id) NOT VALID;
 J   ALTER TABLE ONLY public.result_base_on_question DROP CONSTRAINT "userID";
       public               postgres    false    4776    224    218            V   >   x�3�,(ʬL�+��tL���s042��8��LuLu��M��M��,L�-�̸b���� ��;      P     x�}�Kn�0е|
��$%J��ҍ��Z��Y��Ma�� wf�Ԙ��(��H�&"E봀�o�р�����<�sW�V,[q�l�a>VF�o״�=�s:�u�Ku�|=QB�RVu�yȥ�S>h<m�؝�m�QL(�T�J�����T��'N^d
���Sens�M��I�w}��dc��^�y:=m&�����7cc)0�PP�����'���F��M�=�c�~Y.�i��MC?��� x�x�V�]WU�T*��      R   �  x��W[o�F~�������r�w!u�q��)�4}�C��H��
Cʪ�� ��E���ӧ���i7/)�_B���P�%Fj��E��;�|�2gd�(�'�Ģ�t�C��A�6�l���0q���w�^h{���r@�Ϳ�QtG�8�K���K<�)�n�8���D���zH��~#f����]����{��UXqmD������ӂ�W�z��]9��� ����ٶ�z>8���B@Pd�";���߬�	� Z�-���*��A4/����ަ�	@Xr���2�p�q�CLp�ge"����sy��$�ÊB�r|��a�q�֩i�s[��8��tL�]-Q��r�(�y��j�#]�@����Aߡ=�8n�W+��\��c�I8%|�Gy~R�XH����b��=�F�6g��X+*[�MP�r�s�K����B a:f\>ǯ�V�:ri߳{^�Pȯ�Њ JC��Q	��~�,����?p�Rq�1�NS�M&��L�8WLNxс�b�_�ߤi�c���w���JF,b�χI��	���b!s���8Wx'�4d1�&'j�n��,Ep�Ƴ�ǛYD��%�"켟�Q��eHuF�4Vǳ��r5��a��p`.���Ebp�\���$,^.C:�7���i��k��BzAܔE����|K\��R���b
M��e�א�\���ZE��1�j g8�jL�,�8�}^�͌�W���w��C7Z�EcSGz�2ɍm}H���w�� ��T��[L��l*�����b�'�R���{ith_��d�1	n�(%Y�<�ڇh尩��#o��bB��frR���3��6�F�l���|���=,��q��c<VyfX�2ˋ�n�t��ńK�� 2zp��q.�"�X�-�f}�q�!������*t�L�X
�&;�SshLb�:E��9���3��n3�F�Y$@~�{�Z�"���X2� ��D	<��LH����z�&s&�ezI�]��@�&�d�28�	�Hw�1%N��d6��Aϧ@����H�nH<7)?��&ܐ�J�@��,����M^�t:S�n��0�`�Z���nYq=��p�D���F�G��E��y���2�KѤ!�S�D9��|�ϔ�8bx�u���v�-[p Z)��&[9��i�?M���=��w�gg��{��XЭ�I�D�luz=��tuaί�7��|/�:�,J��Z�mg
#%���.��Z*�,�*�ނ�9:��pGBo(FB_-���N�'_%Cw�ʎejV��7e�Q�xK\=?t�UI�R���SW���x�������������SXz\W��Ue00x��2��O���������gV����ˌ��L�0�`�� ��>?�rv��׳=7�5!�m8Ȑ;��o�"���w~��� l&����������d��#�U�я+��S#h��՗ơ-�������l&O���-nD.4��Xp�9���W��S�~~v���D<2V>1�V��a�6f�R#�����^w�#r�+��nW�E�֏���:&�[{�۽{��E�:Ͷ׸�w�ߙFU�s�̦,5a�`�{�s��\j<[�-�]�?^]m��b��
ڶ8�>�`��~���Y2[��'ظ�T8��uC����Yִ��x�<�SS\��&���	A]}o����Ml	��LiMQ��5�:�򚄾L�D��^�܏��Aϲ�? >q��      X   �   x�u�=�0��=;���8>DO���/��Z����{y��� _)V�QY�Od5r'/��O���|ck["H!�~םk+Α���	�	o�`WoR̨�|��~��ٞ�5��3f&�Y��	�}z���,����Lp'��C^N�c��8�<��
��@�y��˲� `�CZ      T   ?  x�}����@�k�)�G�vf������$*��ds�.�#;w�KjD	�PR9H !Zx?
�Ql�.�ʕ����ffg1��'HQ̩�%�f\f¤ F FE�hB�ՌM�$'��]7.��xG·d��"�2j�	�Ӕ*��2�K��<��@�{0CL)��@=�
#���ڑ���y�L�j��jaA�Џ9�J� @D@��I`���,,���p�N��6�*��z2G�^
6�a0 "�B��Q�x��F�I����@����F苢,]Mrېk�J���ۢ�!���-)��|G�[��Y�n��h�fr��k�.n�����t[��!�\����kB�Hgj{S�����/BD��x��X�}a�����hr�<�����cIզ��j��P�����T#>,v�}��_}���~�Mk~A��C��w��{�yD�B�Q�rt��w�L1
sf>���w?}J�eD����c�x38�OA3�R)��ؼ�m��݄��iE���<�[[�6c"vǿ��u��Q���;�	�oI��vS""�*��_���w�`�D_Z"C��>H:�V���l6��4r�      N   �   x�M�1�0�����+m'�4&.�.1@�B`0�{cR��^�ψy��1���cj�8�2���1��j�qoi�\�-
�@.�W���� $��˶�CP�a[9�+X ����@�mV�x�kY�ﺍc�.���x��o��@���c���+)��x=�     