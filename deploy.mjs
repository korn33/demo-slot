import { execSync } from 'child_process';
import ghpages from 'gh-pages';

const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
const date = new Date().toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

execSync('npm run build', { stdio: 'inherit' });

ghpages.publish('dist', { message: `🚀 Deploy ${date}\n\nBased on commit: ${commitMessage}` }, (error) => {
    if (error) {
        console.error('❌ Ошибка при деплое:', error);
        process.exit(1);
    }
    console.log('✅ Деплой успешно завершен!');
});
