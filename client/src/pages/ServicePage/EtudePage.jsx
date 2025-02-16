import React from 'react'
import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom';

const EtudePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Étudier à l'étranger
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Réalisez vos rêves d'étudier à l'étranger avec notre accompagnement personnalisé.
            </p>
          </div>
        </div>
      </section>

      {/* Inscription Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">Inscription</h2>
              <p className="mt-4 text-lg text-gray-600">
                Nous vous aidons à vous inscrire dans les universités et écoles de votre choix à l'étranger. Notre équipe vous accompagne à chaque étape : sélection des établissements, constitution des dossiers, et soumission des candidatures. Avec nous, chaque détail est pris en compte pour maximiser vos chances de réussite. Plus qu'une simple inscription, c'est le début d'une aventure enrichissante et bien encadrée.
              </p>
            </div>
            <div>
              <img src="https://cdn.pixabay.com/photo/2020/12/05/14/09/man-5806015_640.jpg" alt="Inscription" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Admission Section */}
      <section className="py-24 bg-gray-100">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">Admission</h2>
              <p className="mt-4 text-lg text-gray-600">
                Grâce à notre expertise, nous maximisons vos chances d'être accepté dans l'établissement de votre choix. Nous analysons vos compétences et vos aspirations pour vous proposer les meilleures options. Vous bénéficiez d'un suivi personnalisé et de conseils sur mesure, allant de la préparation des entretiens à la rédaction de lettres de motivation impactantes. Ensemble, nous transformons votre ambition en admission réussie.
              </p>
            </div>
            <div>
              <img src="https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_640.jpg" alt="Admission" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Assistance Visa Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">Assistance Visa</h2>
              <p className="mt-4 text-lg text-gray-600">
                Les démarches pour l'obtention d'un visa étudiant peuvent être complexes et stressantes. Nous vous offrons un accompagnement complet pour simplifier ce processus. De la préparation des documents à la prise de rendez-vous, nous vous guidons pas à pas pour que votre demande de visa soit validée rapidement et sans souci. Avec notre soutien, partir à l'étranger devient une réalité sans tracas.
              </p>
            </div>
            <div>
              <img src="https://cdn.pixabay.com/photo/2017/08/14/22/05/passport-2642171_640.jpg" alt="Visa Assistance" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Accueil et Installation Section */}
      <section className="py-24 bg-gray-100">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">Accueil et Installation</h2>
              <p className="mt-4 text-lg text-gray-600">
                Arriver dans un nouveau pays peut être intimidant. C'est pourquoi nous sommes là pour vous accueillir dès votre arrivée et vous aider à vous installer confortablement. Recherche de logement, ouverture de compte bancaire, et premières démarches locales : nous nous occupons de tout pour que votre intégration soit douce et réussie. Votre bien-être est notre priorité.
              </p>
            </div>
            <div>
              {/* Slider for images */}
              <div className="relative">
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
                <img
                  src="https://img.freepik.com/photos-gratuite/jeune-femme-heureuse-serrant-main-agent-immobilier-pendant-que-son-mari-utilise-pave-tactile-au-bureau_637285-2822.jpg?uid=R76374802&ga=GA1.1.771489851.1734685215&semt=ais_hybrid"
                  alt="Installation"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                {/* Add more images for slider */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assistance Administrative Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">Assistance Administrative</h2>
              <p className="mt-4 text-lg text-gray-600">
                Les formalités administratives à l'étranger peuvent vite devenir un casse-tête. Nous vous accompagnons dans toutes les démarches essentielles : obtention de la carte de séjour, inscription à la sécurité sociale, démarches universitaires, et bien plus encore. Avec nous, vous gagnez du temps et évitez les erreurs, pour une expérience sans stress.
              </p>
            </div>
            <div>
              <img src="https://img.freepik.com/photos-gratuite/homme-parlant-vendeuse-dans-salle-exposition_1303-17076.jpg?uid=R76374802&ga=GA1.1.771489851.1734685215&semt=ais_hybrid" alt="Assistance Administrative" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Button Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Prenez Rendez-vous</h2>
          <p className="mt-4 text-lg text-gray-600">
            Vous êtes prêt à commencer votre aventure à l'étranger ? Prenez rendez-vous avec notre équipe pour discuter de votre projet et démarrer votre parcours d'études à l'international.
          </p>
          <button className="mt-8 mx-auto px-6 py-3 bg-primary text-white rounded-lg flex items-center justify-center gap-2 ">
            <Link className="flex items-center" to={"/nous-contacter"}><Calendar size={20} />
            Nous contacter</Link>
          </button>
        </div>
      </section>
    </main>
  );
};

export default EtudePage;
