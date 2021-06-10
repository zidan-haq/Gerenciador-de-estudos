package com.haq.gerenciadordeestudos.ftp;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.integration.ftp.session.DefaultFtpsSessionFactory;
import org.springframework.integration.ftp.session.FtpSession;

public class FTPConnection {
	private DefaultFtpsSessionFactory gimmeFactory() {
		DefaultFtpsSessionFactory sf = new DefaultFtpsSessionFactory();
		sf.setHost("127.0.0.1");
		sf.setPort(21);
		sf.setUsername("user");
		sf.setNeedClientAuth(false);
		return sf;
	}
	
	public void upload() throws FTPException {
		FtpSession session = gimmeFactory().getSession();
		
		/**
		 * Nessa linha o arquivo está sendo recuperado da pasta local resource como um stream
		 * momento 11:33 do vídeo
		 * link: https://www.youtube.com/watch?v=j0AG4KrzCgs
		 */
		// InputStream file = FTPConnection.class.getClassLoader().getResourceAsStream("mytextfile.txt");
		
		InputStream file = null;
		try {
			file = new FileInputStream(new File("/home/manjaro/lista.txt"));
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
		
		try {
			session.write(file, "arquivouploadiado.txt");
		} catch (IOException e) {
			throw new FTPException("Couldn't upload the file.\n" + e.getMessage());
		} finally {
			session.close();
		}
		
	}
}
