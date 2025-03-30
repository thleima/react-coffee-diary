import { useAuth } from "./store/AuthProvider";
import Layout from "./component/Layout";
import Benefits from "./component/layout/Benefits";
import CoffeeForm from "./component/coffee-form/CoffeeForm";
import AuthContent from "./component/auth-content/AuthContent";
import BackgroundHeading from "./component/layout/BackgroundHeading";
import Footer from "./component/layout/Footer";

function App() {
	const { user } = useAuth();

	return (
		<>
			<BackgroundHeading />
			<main>
				<Layout>
					<Benefits />
					<CoffeeForm />
					{user && <AuthContent />}
				</Layout>
			</main>
			<Footer />
		</>
	);
}

export default App;
