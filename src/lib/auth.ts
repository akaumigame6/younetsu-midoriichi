import { cookies } from 'next/headers';
import { supabase } from './supabase';

/**
 * サーバーコンポーネントおよびAPIルート向けの管理者検証関数。
 * 以下の条件をすべて満たす場合のみ true を返す。
 * 1. 有効なセッショントークンが存在する
 * 2. 匿名ユーザーではない（Email認証などでログインしている）
 */
export async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sb-access-token')?.value;
  
  if (!token) {
    return false;
  }

  // トークンからユーザー情報を取得
  const { data: { user }, error } = await supabase!.auth.getUser(token);
  
  if (error || !user) {
    return false;
  }

  // 匿名ユーザー（来場者など）を弾く
  // 匿名ログインは is_anonymous が true になるため、false のユーザーを管理者（通常ログイン）とみなす
  if (user.is_anonymous) {
    return false;
  }

  return true;
}

