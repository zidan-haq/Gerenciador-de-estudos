package com.haq.gerenciadordeestudos;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.haq.gerenciadordeestudos.ftp.FTPConnection;

@SpringBootTest
class GerenciadorDeEstudosApplicationTests {

	@Test
	void contextLoads() {
		FTPConnection ftp = new FTPConnection();
		ftp.upload();
	}

}
