import { useRouter } from 'next/router';

export default function useAuth(user, redirect = '/login') {
	const router = useRouter();
	if (!user || !user.username) {
		router.replace(redirect);
	}
}
