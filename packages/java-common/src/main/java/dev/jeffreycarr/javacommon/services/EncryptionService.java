package dev.jeffreycarr.javacommon.services;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

import org.springframework.stereotype.Component;

@Component
public class EncryptionService {
  private static final String ALGORITHM = "AES/GCM/NoPadding";
  private static final String KEY_TYPE = "AES";
  private static final int KEY_SIZE = 256;
  private static final int GCM_TAG_LENGTH = 128;
  private static final int GCM_IV_LENGTH = 12;
  
  private SecretKey key;

  public EncryptionService() throws NoSuchAlgorithmException {
    this.key = this.generateKey();
  }
  
  private SecretKey generateKey() throws NoSuchAlgorithmException {
    KeyGenerator generator = KeyGenerator.getInstance(KEY_TYPE);
    generator.init(KEY_SIZE);
    return generator.generateKey();
  }
  
  public String encrypt(String data) throws Exception {
    byte[] iv = new byte[GCM_IV_LENGTH];
    SecureRandom secureRandom = new SecureRandom();
    secureRandom.nextBytes(iv);
    
    Cipher cipher = Cipher.getInstance(ALGORITHM);
    GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
    cipher.init(Cipher.ENCRYPT_MODE, key, gcmParameterSpec);
    byte[] encryptedData = cipher.doFinal(data.getBytes());
    
    byte[] encryptedDataWithIV = new byte[GCM_IV_LENGTH + encryptedData.length];
    System.arraycopy(iv, 0, encryptedDataWithIV, 0, GCM_IV_LENGTH);
    System.arraycopy(encryptedData, 0, encryptedDataWithIV, GCM_IV_LENGTH, encryptedData.length);
    
    return Base64.getEncoder().encodeToString(encryptedDataWithIV);
  }
  
  public String decrypt(String encryptedDataWithIV) throws Exception {
    // Decode the Base64 encrypted data
    byte[] encryptedDataWithIvBytes = Base64.getDecoder().decode(encryptedDataWithIV);

    // Extract the IV (first 12 bytes)
    byte[] iv = new byte[GCM_IV_LENGTH];
    System.arraycopy(encryptedDataWithIvBytes, 0, iv, 0, GCM_IV_LENGTH);

    // Extract the encrypted data (remaining bytes)
    byte[] encryptedData = new byte[encryptedDataWithIvBytes.length - GCM_IV_LENGTH];
    System.arraycopy(encryptedDataWithIvBytes, GCM_IV_LENGTH, encryptedData, 0, encryptedData.length);

    // Initialize the cipher in decryption mode
    Cipher cipher = Cipher.getInstance(ALGORITHM);
    GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
    cipher.init(Cipher.DECRYPT_MODE, key, gcmParameterSpec);

    // Decrypt the data
    byte[] decryptedData = cipher.doFinal(encryptedData);

    return new String(decryptedData);
  }
}
